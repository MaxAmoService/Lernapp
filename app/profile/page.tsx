"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { getUserLevel, validatePassword } from "@/lib/auth";
import {
  User, Mail, Lock, Camera, Save, Loader2, CheckCircle2, AlertCircle,
  Shield, Bell, Palette, Trophy, Flame, Zap, BookOpen, ArrowLeft,
  Eye, EyeOff, RefreshCw, Edit3, X
} from "lucide-react";

const AVATARS = ["🤓", "😎", "🦊", "🐱", "🦄", "🐸", "🐼", "🦁", "🐯", "🐨", "🐻", "🐰", "🦊", "🐨", "🦋", "🐙"];

type Tab = "profile" | "security" | "settings" | "stats";

export default function ProfilePage() {
  const { user, isLoading, updateProfile, updatePassword, updateEmail, resendVerification, deleteUserAccount } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Profile fields
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Security fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");

  // Settings
  const [notifications, setNotifications] = useState(true);

  // DSGVO Account löschen
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteStep, setDeleteStep] = useState(0);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || user.username);
      setBio(user.bio || "");
      setAvatar(user.avatar || "🤓");
      setNotifications(user.settings?.notifications ?? true);
      setNewEmail(user.email);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">🔒</span>
        <h2 className="text-2xl font-bold">Nicht eingeloggt</h2>
        <p className="text-slate-400">Bitte melde dich an, um dein Profil zu sehen.</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
        >
          Zur Startseite
        </button>
      </div>
    );
  }

  const levelInfo = getUserLevel(user.totalXP);

  const showMessage = (type: "success" | "error", msg: string) => {
    if (type === "success") { setSuccess(msg); setError(""); }
    else { setError(msg); setSuccess(""); }
    setTimeout(() => { setSuccess(""); setError(""); }, 5000);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await updateProfile({
        displayName: displayName.trim() || user.username,
        bio: bio.trim(),
        avatar,
      });
      showMessage("success", "Profil gespeichert! ✅");
    } catch {
      showMessage("error", "Profil konnte nicht gespeichert werden");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmNewPassword) {
      showMessage("error", "Passwörter stimmen nicht überein");
      return;
    }

    const validation = validatePassword(newPassword);
    if (!validation.valid) {
      showMessage("error", validation.error!);
      return;
    }

    setSaving(true);
    try {
      await updatePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      showMessage("success", "Passwort geändert! 🔐");
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
        showMessage("error", "Aktuelles Passwort ist falsch");
      } else {
        showMessage("error", "Passwort konnte nicht geändert werden");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.includes("@")) {
      showMessage("error", "Ungültige E-Mail-Adresse");
      return;
    }
    setSaving(true);
    try {
      await updateEmail(emailPassword, newEmail);
      setEmailPassword("");
      showMessage("success", "E-Mail geändert! Bestätigungs-E-Mail gesendet. 📧");
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/invalid-credential") {
        showMessage("error", "Passwort ist falsch");
      } else if (code === "auth/email-already-in-use") {
        showMessage("error", "Diese E-Mail wird bereits verwendet");
      } else {
        showMessage("error", "E-Mail konnte nicht geändert werden");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerification();
      showMessage("success", "Bestätigungs-E-Mail erneut gesendet! 📧");
    } catch {
      showMessage("error", "E-Mail konnte nicht gesendet werden");
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profil", icon: <User className="w-4 h-4" /> },
    { id: "security", label: "Sicherheit", icon: <Shield className="w-4 h-4" /> },
    { id: "settings", label: "Einstellungen", icon: <Palette className="w-4 h-4" /> },
    { id: "stats", label: "Statistiken", icon: <Trophy className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold">Mein Profil</h1>
      </div>

      {/* Status Messages */}
      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> {success}
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 flex items-center gap-2 animate-slide-up">
          <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
        </div>
      )}

      {/* Profile Header Card */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative group">
            <button
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center text-5xl border-4 border-slate-700 hover:border-blue-500 transition-colors relative"
            >
              {avatar}
              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </button>

            {/* Avatar Picker */}
            {showAvatarPicker && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 glass rounded-xl p-4 z-20 animate-slide-up">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-300">Avatar wählen</span>
                  <button onClick={() => setShowAvatarPicker(false)}>
                    <X className="w-4 h-4 text-slate-400 hover:text-white" />
                  </button>
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {AVATARS.map((a, i) => (
                    <button
                      key={i}
                      onClick={() => { setAvatar(a); setShowAvatarPicker(false); }}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl hover:bg-slate-700 transition-colors ${a === avatar ? "bg-blue-500/30 ring-2 ring-blue-500" : ""}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold">{user.displayName || user.username}</h2>
            <p className="text-slate-400">@{user.username}</p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                Level {levelInfo.level} — {levelInfo.title}
              </span>
              {!user.emailVerified && (
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-sm rounded-full flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> E-Mail nicht bestätigt
                </span>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="text-center">
              <Flame className="w-6 h-6 text-orange-400 mx-auto" />
              <p className="text-lg font-bold">{user.streak}</p>
              <p className="text-xs text-slate-400">Streak</p>
            </div>
            <div className="text-center">
              <Zap className="w-6 h-6 text-yellow-400 mx-auto" />
              <p className="text-lg font-bold">{user.totalXP}</p>
              <p className="text-xs text-slate-400">XP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSuccess(""); setError(""); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-blue-500/20 text-blue-400"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass rounded-2xl p-6">
        {/* ===== PROFILE TAB ===== */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Anzeigename
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Dein Anzeigename"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
              />
              <p className="text-xs text-slate-500 mt-1">So sehen dich andere Nutzer</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Edit3 className="w-4 h-4 inline mr-2" />
                Über mich
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Erzähl etwas über dich..."
                maxLength={200}
                rows={3}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500 resize-none"
              />
              <p className="text-xs text-slate-500 mt-1">{bio.length}/200 Zeichen</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                E-Mail
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 cursor-not-allowed"
                />
                {user.emailVerified ? (
                  <span className="px-3 py-2 bg-green-500/20 text-green-400 text-sm rounded-lg flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Bestätigt
                  </span>
                ) : (
                  <button
                    onClick={handleResendVerification}
                    className="px-3 py-2 bg-amber-500/20 text-amber-400 text-sm rounded-lg hover:bg-amber-500/30 transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className="w-4 h-4" /> Bestätigen
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">Ändern unter „Sicherheit"</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Benutzername
              </label>
              <input
                type="text"
                value={user.username}
                disabled
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 cursor-not-allowed"
              />
              <p className="text-xs text-slate-500 mt-1">Benutzername kann nicht geändert werden</p>
            </div>

            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? "Wird gespeichert..." : "Profil speichern"}
            </button>
          </div>
        )}

        {/* ===== SECURITY TAB ===== */}
        {activeTab === "security" && (
          <div className="space-y-8">
            {/* Change Password */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-400" />
                Passwort ändern
              </h3>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Aktuelles Passwort</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPw ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      required
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Neues Passwort</label>
                  <input
                    type={showPw ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 Zeichen + Zahl"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Neues Passwort bestätigen</label>
                  <input
                    type={showPw ? "text" : "password"}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-lg focus:outline-none focus:ring-2 text-white ${
                      confirmNewPassword && newPassword !== confirmNewPassword ? "border-red-500 focus:ring-red-500" : "border-slate-700 focus:ring-blue-500"
                    }`}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                  Passwort ändern
                </button>
              </form>
            </div>

            <hr className="border-slate-700" />

            {/* Change Email */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                E-Mail ändern
              </h3>
              <form onSubmit={handleChangeEmail} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Neue E-Mail-Adresse</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Passwort zur Bestätigung</label>
                  <input
                    type="password"
                    value={emailPassword}
                    onChange={(e) => setEmailPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                  E-Mail ändern
                </button>
              </form>
            </div>

            <hr className="border-slate-700" />

            {/* DSGVO: Account löschen */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                Account löschen
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Alle deine Daten werden permanent gelöscht. Dies kann nicht rückgängig gemacht werden.
              </p>

              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition-colors"
                >
                  Account unwiderruflich löschen
                </button>
              ) : (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg space-y-4">
                  <p className="text-red-400 font-medium">⚠️ Bist du sicher?</p>
                  <p className="text-slate-400 text-sm">
                    Alle Lernfortschritte, Statistiken und dein Account werden permanent gelöscht.
                  </p>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Passwort zur Bestätigung</label>
                    <input
                      type="password"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      placeholder="Dein aktuelles Passwort"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setShowDeleteConfirm(false); setDeletePassword(""); }}
                      className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      Abbrechen
                    </button>
                    <button
                      onClick={async () => {
                        if (!deletePassword) return;
                        setSaving(true);
                        try {
                          await deleteUserAccount(deletePassword);
                          router.push("/");
                        } catch (err: unknown) {
                          const code = (err as { code?: string })?.code;
                          if (code === "auth/invalid-credential") showMessage("error", "Passwort ist falsch");
                          else showMessage("error", "Account konnte nicht gelöscht werden");
                        } finally {
                          setSaving(false);
                        }
                      }}
                      disabled={saving || !deletePassword}
                      className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      Ja, Account löschen
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== SETTINGS TAB ===== */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium">Benachrichtigungen</p>
                  <p className="text-sm text-slate-400">Erinnerungen zum Lernen</p>
                </div>
              </div>
              <button
                onClick={async () => {
                  const newVal = !notifications;
                  setNotifications(newVal);
                  await updateProfile({ settings: { ...user.settings, notifications: newVal } });
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? "bg-blue-500" : "bg-slate-600"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications ? "translate-x-6" : "translate-x-0.5"}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-medium">Design</p>
                  <p className="text-sm text-slate-400">Aktuell: Dunkel</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-slate-700 text-slate-400 text-sm rounded-full">Dark Mode</span>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-green-400" />
                <div>
                  <p className="font-medium">Gespeicherte Module</p>
                  <p className="text-sm text-slate-400">{user.savedModules?.length || 0} Module gemerkt</p>
                </div>
              </div>
              {user.savedModules && user.savedModules.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.savedModules.map((slug) => (
                    <span key={slug} className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                      {slug}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">Noch keine Module gespeichert</p>
              )}
            </div>
          </div>
        )}

        {/* ===== STATS TAB ===== */}
        {activeTab === "stats" && (
          <div className="space-y-6">
            {/* Level Progress */}
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Level {levelInfo.level} — {levelInfo.title}</h3>
                <span className="text-sm text-slate-400">{levelInfo.xpToNext} XP bis Level {levelInfo.level + 1}</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                  style={{ width: `${levelInfo.progress}%` }}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">{user.streak}</p>
                <p className="text-sm text-slate-400">Tage Streak</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">{user.totalXP}</p>
                <p className="text-sm text-slate-400">Gesamt XP</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">{user.completedModules.length}</p>
                <p className="text-sm text-slate-400">Module fertig</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  {Object.values(user.completedLessons).flat().length}
                </p>
                <p className="text-sm text-slate-400">Lektionen</p>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="font-semibold mb-3">🏆 Erfolge</h3>
              <div className="flex flex-wrap gap-2">
                {user.streak >= 3 && (
                  <span className="px-3 py-1.5 bg-orange-500/20 text-orange-400 text-sm rounded-full">🔥 3+ Tage Streak</span>
                )}
                {user.completedModules.length >= 1 && (
                  <span className="px-3 py-1.5 bg-green-500/20 text-green-400 text-sm rounded-full">🎯 Erstes Modul</span>
                )}
                {user.totalXP >= 100 && (
                  <span className="px-3 py-1.5 bg-purple-500/20 text-purple-400 text-sm rounded-full">⭐ 100 XP</span>
                )}
                {user.totalXP >= 500 && (
                  <span className="px-3 py-1.5 bg-yellow-500/20 text-yellow-400 text-sm rounded-full">💎 500 XP</span>
                )}
                {user.totalXP >= 1000 && (
                  <span className="px-3 py-1.5 bg-blue-500/20 text-blue-400 text-sm rounded-full">🏅 1000 XP</span>
                )}
                {user.streak >= 7 && (
                  <span className="px-3 py-1.5 bg-red-500/20 text-red-400 text-sm rounded-full">🔥 7 Tage Streak</span>
                )}
                {user.streak >= 30 && (
                  <span className="px-3 py-1.5 bg-pink-500/20 text-pink-400 text-sm rounded-full">👑 30 Tage Streak</span>
                )}
                {(user.savedModules?.length || 0) >= 3 && (
                  <span className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 text-sm rounded-full">📚 Sammler</span>
                )}
                {user.completedModules.length >= 5 && (
                  <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-sm rounded-full">🎓 5 Module</span>
                )}
                {user.completedModules.length === 0 && user.streak < 3 && user.totalXP < 100 && (
                  <span className="text-sm text-slate-500 italic">Spiele Erfolge frei! 🎮</span>
                )}
              </div>
            </div>

            {/* Account Info */}
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <h3 className="font-semibold mb-3">📋 Account-Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Mitglied seit</span>
                  <span>{new Date(user.createdAt).toLocaleDateString("de-DE")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Letzte Aktivität</span>
                  <span>{new Date(user.lastActive).toLocaleDateString("de-DE")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">E-Mail verifiziert</span>
                  <span>{user.emailVerified ? "✅ Ja" : "❌ Nein"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
