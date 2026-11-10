import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export async function POST() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase belum terkonfigurasi" }, { status: 400 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminClient = createServiceRoleClient();
  if (!adminClient) {
    return NextResponse.json(
      { error: "Kunci SUPABASE_SERVICE_ROLE_KEY dibutuhkan di server untuk menghapus akun pengguna." },
      { status: 500 }
    );
  }

  // Delete user from auth.users via Supabase Admin API; cascades to profiles & user_progress
  const { error } = await adminClient.auth.admin.deleteUser(user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: "Akun dan semua data progres berhasil dihapus secara permanen.",
  });
}
