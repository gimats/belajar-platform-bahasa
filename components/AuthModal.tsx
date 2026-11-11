"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";
import { mergeGuestProgressToUser } from "@/lib/guest-storage";
import { X, Mail, Lock, Loader2, Sparkles, AlertCircle, CheckCircle } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "register";
}

export function AuthModal({
  isOpen,
  onClose,
  defaultMode = "register",
}: AuthModalProps) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"login" | "register" | "forgot">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
      setErrorMsg(null);
      setSuccessMsg(null);
    }
  }, [isOpen, defaultMode]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    if (!isSupabaseConfigured()) {
      setLoading(false);
      setErrorMsg(
        "Koneksi Supabase belum dikonfigurasi di file .env.local. Anda tetap dapat belajar menggunakan Mode Tamu (progres tersimpan di browser)."
      );
      return;
    }

    const supabase = createClient();

    try {
      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          await mergeGuestProgressToUser(data.user.id);
        }

        onClose();
        window.location.reload();
      } else if (mode === "register") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          await mergeGuestProgressToUser(data.user.id);
        }

        setSuccessMsg(
          "Pendaftaran berhasil! Cek email Anda untuk konfirmasi akun atau langsung masuk bila auto-confirm aktif."
        );
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1500);
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
        });

        if (error) throw error;
        setSuccessMsg("Tautan reset kata sandi telah dikirim ke email Anda.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan autentikasi.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md my-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup popup"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 pr-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 rounded-full border border-indigo-100 dark:border-indigo-900">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Akun &amp; Pelacakan Progres</span>
          </div>
          <h2
            id="auth-modal-title"
            className="text-xl font-bold text-slate-900 dark:text-slate-50"
          >
            {mode === "login"
              ? "Masuk ke Akun Anda"
              : mode === "register"
              ? "Daftar Akun Baru"
              : "Lupa Kata Sandi"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === "register"
              ? "Progres belajar dari mode tamu akan otomatis digabungkan ke akun Anda."
              : "Masuk untuk melanjutkan streak dan histori hafalan kartu Anda."}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 text-xs text-rose-700 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-900 rounded-2xl flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 text-xs text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 rounded-2xl flex items-start gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {mode !== "forgot" && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Kata Sandi
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Lupa sandi?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>
              {mode === "login"
                ? "Masuk"
                : mode === "register"
                ? "Daftar Akun"
                : "Kirim Tautan Reset"}
            </span>
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800">
          {mode === "login" ? (
            <p>
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Daftar sekarang
              </button>
            </p>
          ) : (
            <p>
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Masuk di sini
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
