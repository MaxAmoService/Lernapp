"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { X, User, Mail, Lock, Eye, EyeOff } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (username.length < 3) {
      setError("Benutzername muss mindestens 3 Zeichen lang sein");
      setLoading(false);
      return;
    }

    if (password.length < 4) {
      setError("Passwort muss mindestens 4 Zeichen lang sein");
      setLoading(false);
      return;
    }

    if (isRegister) {
      if (!email.includes("@")) {
        setError("Ungültige E-Mail-Adresse");
        setLoading(false);
        return;
      }
      const success = register(username, email, password);
      if (!success) {
        setError("Benutzername existiert bereits");
        setLoading(false);
        return;
      }
    } else {
      const success = login(username, password);
      if (!success) {
        setError("Ungültiger Benutzername oder Passwort");
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    onClose();
    // Reset form
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="glass rounded-2xl p-8 w-full max-w-md mx-4 relative animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">🎓</span>
          <h2 className="text-2xl font-bold">
            {isRegister ? "Konto erstellen" : "Willkommen zurück"}
          </h2>
          <p className="text-slate-400 mt-2">
            {isRegister
              ? "Starte deine Lernreise"
              : "Melde dich an, um weiterzulernen"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Benutzername
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="z.B. moritz_dev"
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                required
              />
            </div>
          </div>

          {/* Email (only for register) */}
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                E-Mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.de"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                  required
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Passwort
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-medium transition-colors"
          >
            {loading ? "Lädt..." : isRegister ? "Konto erstellen" : "Anmelden"}
          </button>
        </form>

        {/* Toggle Register/Login */}
        <div className="mt-6 text-center text-sm text-slate-400">
          {isRegister ? (
            <>
              Bereits ein Konto?{" "}
              <button
                onClick={() => { setIsRegister(false); setError(""); }}
                className="text-blue-400 hover:text-blue-300"
              >
                Anmelden
              </button>
            </>
          ) : (
            <>
              Noch kein Konto?{" "}
              <button
                onClick={() => { setIsRegister(true); setError(""); }}
                className="text-blue-400 hover:text-blue-300"
              >
                Registrieren
              </button>
            </>
          )}
        </div>

        {/* Demo Account Hint */}
        {!isRegister && (
          <div className="mt-4 p-3 bg-slate-800/50 rounded-lg text-center text-sm text-slate-400">
            <p>💡 Tipp: Erstelle ein Konto, um deinen Fortschritt zu speichern!</p>
          </div>
        )}
      </div>
    </div>
  );
}
