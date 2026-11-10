-- LANGUAGES, CHARACTER SETS, CHARACTERS
create table if not exists public.languages (
  id uuid primary key default gen_random_uuid(),
  code varchar(10) not null unique,
  name varchar(50) not null,
  created_at timestamptz not null default now()
);

create table if not exists public.character_sets (
  id uuid primary key default gen_random_uuid(),
  language_id uuid not null references public.languages(id) on delete cascade,
  code varchar(20) not null,
  name varchar(50) not null,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (language_id, code)
);

create table if not exists public.characters (
  id uuid primary key default gen_random_uuid(),
  character_set_id uuid not null references public.character_sets(id) on delete cascade,
  symbol varchar(20) not null,
  romanization varchar(100),
  reading_on varchar(100),
  reading_kun varchar(100),
  tone varchar(10),
  meaning varchar(255),
  example_word varchar(100),
  example_reading varchar(100),
  example_meaning varchar(255),
  audio_url text,
  stroke_order_url text,
  level varchar(10),
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (character_set_id, symbol)
);

create index if not exists idx_characters_set on public.characters(character_set_id);
create index if not exists idx_characters_level on public.characters(level);

-- PROFILES
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name varchar(100),
  avatar_url text,
  streak_count int not null default 0,
  last_active_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- USER PROGRESS
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  character_id uuid not null references public.characters(id) on delete cascade,
  status varchar(20) not null default 'new' check (status in ('new','learning','mastered')),
  review_count int not null default 0,
  last_reviewed_at timestamptz,
  next_review_at timestamptz,
  ease_factor numeric(3,2) not null default 2.50,
  interval_days int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, character_id)
);

create index if not exists idx_progress_user on public.user_progress(user_id);
create index if not exists idx_progress_character on public.user_progress(character_id);
create index if not exists idx_progress_due on public.user_progress(user_id, next_review_at);

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_user_progress_updated on public.user_progress;
create trigger trg_user_progress_updated
  before update on public.user_progress
  for each row execute function public.set_updated_at();

-- ROW LEVEL SECURITY
alter table public.languages enable row level security;
alter table public.character_sets enable row level security;
alter table public.characters enable row level security;
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;

-- Policies for public data
drop policy if exists "Public read languages" on public.languages;
create policy "Public read languages" on public.languages for select using (true);

drop policy if exists "Public read character_sets" on public.character_sets;
create policy "Public read character_sets" on public.character_sets for select using (true);

drop policy if exists "Public read characters" on public.characters;
create policy "Public read characters" on public.characters for select using (true);

-- Policies for user profile
drop policy if exists "Own profile select" on public.profiles;
create policy "Own profile select" on public.profiles for select using (auth.uid() = id);

drop policy if exists "Own profile update" on public.profiles;
create policy "Own profile update" on public.profiles for update using (auth.uid() = id);

-- Policies for user progress
drop policy if exists "Own progress select" on public.user_progress;
create policy "Own progress select" on public.user_progress for select using (auth.uid() = user_id);

drop policy if exists "Own progress insert" on public.user_progress;
create policy "Own progress insert" on public.user_progress for insert with check (auth.uid() = user_id);

drop policy if exists "Own progress update" on public.user_progress;
create policy "Own progress update" on public.user_progress for update using (auth.uid() = user_id);

-- Restrict profile direct updates to display_name and avatar_url only
revoke update on public.profiles from authenticated;
grant update (display_name, avatar_url) on public.profiles to authenticated;

-- Server-side streak update function (Asia/Jakarta timezone, min 10 cards reviewed threshold)
create or replace function public.calculate_user_streak(p_user_id uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_today_jakarta date := (now() at time zone 'Asia/Jakarta')::date;
  v_last_active_jakarta date;
  v_profile record;
  v_today_reviews int;
  v_new_streak int;
begin
  select streak_count, (last_active_at at time zone 'Asia/Jakarta')::date as last_date
  into v_profile
  from public.profiles
  where id = p_user_id;

  if not found then
    return jsonb_build_object('success', false, 'error', 'Profile not found');
  end if;

  -- Count cards reviewed today in Jakarta time
  select count(*) into v_today_reviews
  from public.user_progress
  where user_id = p_user_id
    and (last_reviewed_at at time zone 'Asia/Jakarta')::date = v_today_jakarta;

  v_last_active_jakarta := v_profile.last_date;
  v_new_streak := coalesce(v_profile.streak_count, 0);

  if v_today_reviews >= 10 then
    if v_last_active_jakarta is null then
      v_new_streak := 1;
    elsif v_last_active_jakarta = v_today_jakarta then
      -- Already counted today
      v_new_streak := greatest(1, v_new_streak);
    elsif v_last_active_jakarta = v_today_jakarta - 1 then
      v_new_streak := v_new_streak + 1;
    else
      -- Streak broken
      v_new_streak := 1;
    end if;

    update public.profiles
    set streak_count = v_new_streak,
        last_active_at = now()
    where id = p_user_id;
  end if;

  return jsonb_build_object(
    'success', true,
    'today_reviews', v_today_reviews,
    'streak_count', v_new_streak,
    'is_active_today', v_today_reviews >= 10
  );
end;
$$;
