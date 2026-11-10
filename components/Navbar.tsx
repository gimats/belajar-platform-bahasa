"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserProgress } from "@/hooks/useUserProgress";
import { AuthModal } from "@/components/AuthModal";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Flame, User, LogOut, BookOpen, LayoutDashboard, Info } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { user, isGuest, streakCount } = useUserProgress();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleSignOut = async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.reload();
    }
  };

  const navLinks = [
    { href: "/", label: "Belajar", icon: BookOpen },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/about", label: "Tentang", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-slate-900 dark:text-slate-50">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <span className="font-extrabold text-lg">あ</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold tracking-tight">Belajar Aksara</span>
            <span className="text-[10px] text-slate-400 font-medium">Jepang · Mandarin · English</span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
                  isActive
                    ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Streak & User Auth */}
        <div className="flex items-center gap-2.5">
          {/* Streak Badge */}
          <Link
            href="/dashboard"
            aria-label={`Streak Anda: ${streakCount} hari`}
            className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 rounded-full text-xs font-bold text-amber-700 dark:text-amber-300 shadow-sm hover:scale-105 transition-transform"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{streakCount}</span>
            <span className="hidden sm:inline text-[10px] font-semibold text-amber-600/80 dark:text-amber-400/80">
              hari
            </span>
          </Link>

          {/* User Account / Login */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-indigo-500" />
                <span className="max-w-[100px] truncate">
                  {user.user_metadata?.full_name || user.email?.split("@")[0]}
                </span>
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                aria-label="Keluar akun"
                className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setShowAuth(true);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Masuk
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("register");
                  setShowAuth(true);
                }}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all active:scale-95"
              >
                Daftar
              </button>
            </div>
          )}
        </div>
      </div>

      {showAuth && (
        <AuthModal
          isOpen={showAuth}
          defaultMode={authMode}
          onClose={() => setShowAuth(false)}
        />
      )}
    </header>
  );
}
