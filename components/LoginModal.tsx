"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { validatePassword } from "@/lib/auth";
import { X, User, Mail, Lock, Eye, EyeOff, Shield, CheckCircle2, Loader2, ArrowLeft, RefreshCw } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "login" | "register" | "verify" | "success";

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, register, verifyEmail } = useAuth();
  const [step, setStep] = useState<Step>("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [emailSent, setEmailSent] = useState(false);

  // Resend Cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => {
      setResendCooldown(s => { if (s <= 1) { clearInterval(t); return 0; } return s - 1; });
    }, 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  if (!isOpen) return null;

  const reset = () => {
    setUsername(""); setEmail(""); setPassword(""); setConfirmPassword("");
    setVerificationCode(""); setError(""); setResendCooldown(0); setEmailSent(false);
  };

  const handleClose = () => { reset(); setStep("login"); onClose(); };

  // ─── Login ────────────────────────────────────────────────────────────────

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@") || !email.includes(".")) { setError("Ungültige E-Mail"); return; }
    if (!password) { setError("Bitte Passwort eingeben"); return; }

    setLoading(true);
    try {
      await login(email, password);
      handleClose();
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/invalid-credential" || code === "auth/user-not-found" || code === "auth/wrong-password") {
        setError("Ungültige E-Mail oder Passwort");
      } else if (code === "auth/too-many-requests") {
        setError("Zu viele Versuche. Bitte warte einen Moment.");
      } else if (code === "auth/user-disabled") {
        setError("Dieses Konto wurde deaktiviert.");
      } else {
        setError("Anmeldung fehlgeschlagen.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ─── Register → Code senden ───────────────────────────────────────────────

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username.length < 3) { setError("Benutzername: min. 3 Zeichen"); return; }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) { setError("Benutzername: nur Buchstaben, Zahlen, _ und -"); return; }
    if (!email.includes("@") || !email.includes(".")) { setError("Ungültige E-Mail"); return; }
    const pw = validatePassword(password);
    if (!pw.valid) { setError(pw.error!); return; }
    if (password !== confirmPassword) { setError("Passwörter stimmen nicht überein"); return; }

    setLoading(true);
    try {
      const result = await register(email, password, username);
      setEmailSent(result.sent);
      setStep("verify");
    } catch (err: unknown) {
      const msg = (err as Error)?.message || "Registrierung fehlgeschlagen";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ─── Code verifizieren ────────────────────────────────────────────────────

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (verificationCode.length !== 6) { setError("Code muss 6 Ziffern lang sein"); return; }

    setLoading(true);
    try {
      await verifyEmail(email, verificationCode);
      setStep("success");
      setTimeout(() => handleClose(), 2000);
    } catch (err: unknown) {
      const msg = (err as Error)?.message || "Verifizierung fehlgeschlagen";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ─── Code erneut senden ───────────────────────────────────────────────────

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    try {
      const result = await register(email, password, username);
      setEmailSent(result.sent);
      setResendCooldown(60);
      setError("");
    } catch {
      setError("Code konnte nicht erneut gesendet werden");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="glass rounded-2xl p-8 w-full max-w-md mx-4 relative animate-slide-up">
        <button onClick={handleClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* ===== LOGIN ===== */}
        {step === "login" && (
          <>
            <div className="text-center mb-8">
              <span className="text-5xl mb-4 block">🎓</span>
              <h2 className="text-2xl font-bold">Willkommen zurück</h2>
              <p className="text-slate-400 mt-2">Melde dich an, um weiterzulernen</p>
            </div>

            {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center gap-2"><span>⚠️</span> {error}</div>}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">E-Mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="deine@email.de"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Passwort</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {loading ? "Wird geprüft..." : "Anmelden"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-400">
              Noch kein Konto?{" "}
              <button onClick={() => { setStep("register"); setError(""); }} className="text-blue-400 hover:text-blue-300 font-medium">Registrieren</button>
            </div>
          </>
        )}

        {/* ===== REGISTER ===== */}
        {step === "register" && (
          <>
            <div className="text-center mb-8">
              <span className="text-5xl mb-4 block">🚀</span>
              <h2 className="text-2xl font-bold">Konto erstellen</h2>
              <p className="text-slate-400 mt-2">Starte deine Lernreise</p>
            </div>

            {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center gap-2"><span>⚠️</span> {error}</div>}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Benutzername</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="z.B. moritz_dev"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">E-Mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="deine@email.de"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Passwort</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 Zeichen + Zahl"
                    className="w-full pl-10 pr-12 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded ${password.length >= 6 ? "bg-green-500/20 text-green-400" : "bg-slate-700 text-slate-500"}`}>
                    {password.length >= 6 ? "✓" : "○"} 6+ Zeichen
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ${/[0-9]/.test(password) ? "bg-green-500/20 text-green-400" : "bg-slate-700 text-slate-500"}`}>
                    {/[0-9]/.test(password) ? "✓" : "○"} Zahl
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ${/[a-zA-Z]/.test(password) ? "bg-green-500/20 text-green-400" : "bg-slate-700 text-slate-500"}`}>
                    {/[a-zA-Z]/.test(password) ? "✓" : "○"} Buchstabe
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Passwort bestätigen</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Passwort wiederholen"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-800 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-slate-500 ${
                      confirmPassword && password !== confirmPassword ? "border-red-500 focus:ring-red-500" : "border-slate-700 focus:ring-blue-500"
                    }`} required />
                </div>
                {confirmPassword && password !== confirmPassword && <p className="text-xs text-red-400 mt-1">Passwörter stimmen nicht überein</p>}
              </div>
              <button type="submit" disabled={loading || !!(confirmPassword && password !== confirmPassword)}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {loading ? "Wird erstellt..." : "Konto erstellen"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-400">
              Bereits ein Konto?{" "}
              <button onClick={() => { setStep("login"); setError(""); }} className="text-blue-400 hover:text-blue-300 font-medium">Anmelden</button>
            </div>
          </>
        )}

        {/* ===== EMAIL VERIFICATION (6-stelliger Code) ===== */}
        {step === "verify" && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold">E-Mail bestätigen</h2>
              <p className="text-slate-400 mt-2">Wir haben einen 6-stelligen Code an</p>
              <p className="text-blue-400 font-medium mt-1">{email}</p>
              <p className="text-slate-400 mt-1 text-sm">gesendet.</p>
            </div>

            {/* Hinweis wenn E-Mail nicht gesendet werden konnte */}
            {!emailSent && (
              <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-amber-400 text-sm font-medium">⚠️ E-Mail-Versand fehlgeschlagen</p>
                <p className="text-slate-400 text-xs mt-1">
                  Der Code konnte nicht per E-Mail gesendet werden. Prüfe ob RESEND_API_KEY konfiguriert ist.
                </p>
              </div>
            )}

            {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center gap-2"><span>⚠️</span> {error}</div>}

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">6-stelliger Code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full py-3 px-4 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-center text-2xl tracking-[0.5em] font-mono placeholder-slate-500"
                  required autoFocus
                />
              </div>
              <button type="submit" disabled={loading || verificationCode.length !== 6}
                className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                {loading ? "Wird bestätigt..." : "E-Mail bestätigen"}
              </button>
            </form>

            <div className="mt-4 flex flex-col gap-2">
              <button onClick={handleResend} disabled={resendCooldown > 0 || loading}
                className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                <RefreshCw className={`w-4 h-4 ${resendCooldown > 0 ? "animate-spin" : ""}`} />
                {resendCooldown > 0 ? `Erneut senden in ${resendCooldown}s` : "Code erneut senden"}
              </button>
              <button onClick={() => { setStep("register"); setError(""); setVerificationCode(""); }}
                className="text-sm text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Zurück zur Registrierung
              </button>
            </div>
          </>
        )}

        {/* ===== SUCCESS ===== */}
        {step === "success" && (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Willkommen, {username}! 🎉</h2>
            <p className="text-slate-400">Dein Konto wurde erstellt und bestätigt.</p>
            <p className="text-slate-500 text-sm mt-2">Du wirst automatisch eingeloggt...</p>
          </div>
        )}
      </div>
    </div>
  );
}
