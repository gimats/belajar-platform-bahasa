-- Seed Languages
insert into public.languages (code, name)
values 
  ('ja', 'Japanese'),
  ('zh', 'Mandarin'),
  ('en', 'English')
on conflict (code) do update set name = excluded.name;

-- Seed Character Sets
insert into public.character_sets (language_id, code, name, display_order)
select l.id, 'hiragana', 'Hiragana', 1
from public.languages l where l.code = 'ja'
on conflict (language_id, code) do update set name = excluded.name, display_order = excluded.display_order;

insert into public.character_sets (language_id, code, name, display_order)
select l.id, 'katakana', 'Katakana', 2
from public.languages l where l.code = 'ja'
on conflict (language_id, code) do update set name = excluded.name, display_order = excluded.display_order;

insert into public.character_sets (language_id, code, name, display_order)
select l.id, 'kanji', 'Kanji Dasar (N5)', 3
from public.languages l where l.code = 'ja'
on conflict (language_id, code) do update set name = excluded.name, display_order = excluded.display_order;

insert into public.character_sets (language_id, code, name, display_order)
select l.id, 'pinyin', 'Pinyin & Nada', 1
from public.languages l where l.code = 'zh'
on conflict (language_id, code) do update set name = excluded.name, display_order = excluded.display_order;

insert into public.character_sets (language_id, code, name, display_order)
select l.id, 'alphabet', 'Phonics & Fonetik', 1
from public.languages l where l.code = 'en'
on conflict (language_id, code) do update set name = excluded.name, display_order = excluded.display_order;
