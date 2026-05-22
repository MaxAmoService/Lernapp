"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { getUserLevel, validatePassword } from "@/lib/auth";
import { AvatarFrame } from "@/components/AvatarFrame";
import {
  AVATARS, FRAMES, getUnlockedAvatars, getUnlockedFrames,
  getRarityColor, getRarityBg, isAvatarUnlocked, isFrameUnlocked,
  type AvatarOption, type FrameOption,
} from "@/lib/rewards";
import { getLeaderboard } from "@/lib/auth";
import {
  User, Mail, Lock, Camera, Save, Loader2, CheckCircle2, AlertCircle,
  Shield, Bell, Palette, Trophy, Flame, Zap, BookOpen, ArrowLeft,
  Eye, EyeOff, RefreshCw, Edit3, X, Users, Sparkles, Lock as LockIcon,
} from "lucide-react";

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
  const [equippedFrame, setEquippedFrame] = useState("none");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Security
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");

  // Settings
  const [notifications, setNotifications] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || user.username);
      setBio(user.bio || "");
      setAvatar(user.avatar || "🤓");
      setEquippedFrame(user.equippedFrame || "none");
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
        <p className="text-slate-400">Bitte melde dich an.</p>
        <button onClick={() => router.push("/")} className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
          Zur Startseite
        </button>
      </div>
    );
  }

  const levelInfo = getUserLevel(user.totalXP);
  const [leaderboardRank, setLeaderboardRank] = useState<number | undefined>(undefined);

  // Leaderboard-Rang laden
  useEffect(() => {
    if (!user) return;
    getLeaderboard(50).then((entries) => {
      const rank = entries.find(e => e.uid === user.uid);
      setLeaderboardRank(rank?.rank);
    }).catch(() => {});
  }, [user]);

  const unlockedAvatars = getUnlockedAvatars(levelInfo.level, leaderboardRank);
  const unlockedFrames = getUnlockedFrames(levelInfo.level, leaderboardRank);

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
        equippedFrame,
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
    if (newPassword !== confirmNewPassword) { showMessage("error", "Passwörter stimmen nicht überein"); return; }
    const v = validatePassword(newPassword);
    if (!v.valid) { showMessage("error", v.error!); return; }
    setSaving(true);
    try {
      await updatePassword(currentPassword, newPassword);
      setCurrentPassword(""); setNewPassword(""); setConfirmNewPassword("");
      showMessage("success", "Passwort geändert! 🔐");
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/invalid-credential") showMessage("error", "Aktuelles Passwort ist falsch");
      else showMessage("error", "Passwort konnte nicht geändert werden");
    } finally { setSaving(false); }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.includes("@")) { showMessage("error", "Ungültige E-Mail"); return; }
    setSaving(true);
    try {
      await updateEmail(emailPassword, newEmail);
      setEmailPassword("");
      showMessage("success", "E-Mail geändert! 📧");
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/invalid-credential") showMessage("error", "Passwort ist falsch");
      else showMessage("error", "E-Mail konnte nicht geändert werden");
    } finally { setSaving(false); }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profil", icon: <User className="w-4 h-4" /> },
    { id: "security", label: "Sicherheit", icon: <Shield className="w-4 h-4" /> },
    { id: "settings", label: "Einstellungen", icon: <Palette className="w-4 h-4" /> },
    { id: "stats", label: "Statistiken", icon: <Trophy className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold">Mein Profil</h1>
      </div>

      {/* Messages */}
      {success && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="w-4 h-4" /> {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 flex items-center gap-2 animate-slide-up">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {/* Profile Header Card */}
      <div className="glass rounded-2xl p-5 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Avatar with Frame */}
          <div className="relative group">
            <button
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="relative rounded-full hover:opacity-90 transition-opacity"
            >
              <AvatarFrame
                avatar={avatar}
                frameId={equippedFrame}
                level={levelInfo.level}
                size="xl"
              />
              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </button>
          </div>

          <div className="text-center sm:text-left flex-1">
            <h2 className="text-xl sm:text-2xl font-bold">{user.displayName || user.username}</h2>
            <p className="text-slate-400 text-sm">@{user.username}</p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium">
                Level {levelInfo.level} — {levelInfo.title}
              </span>
              {!user.emailVerified && (
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> E-Mail nicht bestätigt
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-5">
            <div className="text-center">
              <Flame className="w-5 h-5 text-orange-400 mx-auto" />
              <p className="text-lg font-bold">{user.streak}</p>
              <p className="text-[10px] text-slate-500 uppercase">Streak</p>
            </div>
            <div className="text-center">
              <Zap className="w-5 h-5 text-yellow-400 mx-auto" />
              <p className="text-lg font-bold">{user.totalXP}</p>
              <p className="text-[10px] text-slate-500 uppercase">XP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar & Frame Picker */}
      {showAvatarPicker && (
        <div className="glass rounded-2xl p-5 sm:p-6 mb-6 animate-slide-up">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Avatar & Rahmen
            </h3>
            <button onClick={() => setShowAvatarPicker(false)} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Preview */}
          <div className="flex items-center justify-center mb-6 py-4">
            <AvatarFrame avatar={avatar} frameId={equippedFrame} level={levelInfo.level} size="xl" />
          </div>

          {/* Avatars */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Avatare</h4>
            <div className="grid grid-cols-8 sm:grid-cols-12 gap-2">
              {AVATARS.map((a) => {
                const unlocked = isAvatarUnlocked(a, levelInfo.level, leaderboardRank);
                const isSelected = avatar === a.emoji;
                const tooltip = !unlocked
                  ? a.leaderboardRank !== undefined
                    ? `Nur für Platz ${a.leaderboardRank} in der Bestenliste`
                    : `Level ${a.unlockLevel} freischalten`
                  : a.name;
                return (
                  <div key={a.id} className="relative group/avatar">
                    <button
                      onClick={() => unlocked && setAvatar(a.emoji)}
                      disabled={!unlocked}
                      className={`relative w-full aspect-square rounded-xl flex items-center justify-center text-2xl transition-all ${
                        isSelected
                          ? `${getRarityBg(a.rarity)} border-2 ring-2 ring-blue-500/50 scale-110`
                          : unlocked
                            ? "bg-slate-800/60 border border-slate-700/40 hover:bg-slate-700/60 hover:scale-105"
                            : "bg-slate-800/30 border border-slate-800/40 opacity-40 cursor-not-allowed"
                      }`}
                    >
                      {a.emoji}
                      {!unlocked && (
                        <div className="absolute inset-0 rounded-xl bg-black/40 flex items-center justify-center">
                          <LockIcon className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                      )}
                      {a.rarity === "legendary" && unlocked && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border border-slate-900" />
                      )}
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-center whitespace-nowrap opacity-0 group-hover/avatar:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                      <span className={getRarityColor(a.rarity)}>{a.name}</span>
                      {!unlocked && <span className="block text-slate-500 mt-0.5">🔒 {tooltip}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Frames */}
          <div>
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Rahmen</h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {FRAMES.map((f) => {
                const unlocked = isFrameUnlocked(f, levelInfo.level, leaderboardRank);
                const isSelected = equippedFrame === f.id;
                const tooltip = !unlocked
                  ? f.leaderboardRank !== undefined
                    ? `Nur für Platz ${f.leaderboardRank} in der Bestenliste`
                    : `Level ${f.unlockLevel} freischalten`
                  : f.name;
                return (
                  <div key={f.id} className="relative group/frame">
                    <button
                      onClick={() => unlocked && setEquippedFrame(f.id)}
                      disabled={!unlocked}
                      className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all w-full ${
                        isSelected
                          ? `${getRarityBg(f.rarity)} border-2 ring-2 ring-blue-500/50`
                          : unlocked
                            ? "bg-slate-800/60 border border-slate-700/40 hover:bg-slate-700/60"
                            : "bg-slate-800/30 border border-slate-800/40 opacity-40 cursor-not-allowed"
                      }`}
                    >
                      <AvatarFrame avatar="🎓" frameId={f.id} level={levelInfo.level} leaderboardRank={leaderboardRank} size="sm" />
                      <span className={`text-[10px] font-medium truncate ${isSelected ? "text-blue-400" : "text-slate-500"}`}>
                        {f.name}
                      </span>
                      {f.animated && unlocked && (
                        <span className="absolute -top-1 -right-1 text-[8px] px-1 py-0.5 bg-amber-500/20 text-amber-400 rounded font-bold">
                          ✨
                        </span>
                      )}
                      {!unlocked && (
                        <div className="absolute inset-0 rounded-xl bg-black/40 flex items-center justify-center">
                          <LockIcon className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                      )}
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-center whitespace-nowrap opacity-0 group-hover/frame:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                      <span className={getRarityColor(f.rarity)}>{f.name}</span>
                      {f.animated && <span className="ml-1 text-amber-400">✨</span>}
                      {!unlocked && <span className="block text-slate-500 mt-0.5">🔒 {tooltip}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Save */}
          <button
            onClick={async () => {
              setSaving(true);
              try {
                await updateProfile({ avatar, equippedFrame });
                showMessage("success", "Avatar gespeichert! ✅");
                setShowAvatarPicker(false);
              } catch { showMessage("error", "Fehler beim Speichern"); }
              finally { setSaving(false); }
            }}
            disabled={saving}
            className="mt-5 w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 disabled:from-slate-700 disabled:to-slate-700 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Avatar speichern
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSuccess(""); setError(""); }}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === tab.id ? "bg-blue-500/20 text-blue-400" : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass rounded-2xl p-5 sm:p-6">
        {/* ===== PROFILE ===== */}
        {activeTab === "profile" && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Anzeigename</label>
              <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Dein Name"
                className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-slate-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Über mich</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Erzähl etwas über dich..." maxLength={200} rows={3}
                className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-slate-500 resize-none" />
              <p className="text-[11px] text-slate-600 mt-1">{bio.length}/200</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">E-Mail</label>
              <div className="flex items-center gap-3">
                <input type="email" value={user.email} disabled className="flex-1 px-4 py-3 bg-slate-800/30 border border-slate-700/60 rounded-xl text-slate-400 cursor-not-allowed" />
                {user.emailVerified ? (
                  <span className="px-3 py-2 bg-green-500/20 text-green-400 text-xs rounded-lg flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> OK</span>
                ) : (
                  <button onClick={resendVerification} className="px-3 py-2 bg-amber-500/20 text-amber-400 text-xs rounded-lg hover:bg-amber-500/30"><RefreshCw className="w-3.5 h-3.5" /></button>
                )}
              </div>
            </div>
            <button onClick={handleSaveProfile} disabled={saving}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Profil speichern
            </button>
          </div>
        )}

        {/* ===== SECURITY ===== */}
        {activeTab === "security" && (
          <div className="space-y-8">
            <form onSubmit={handleChangePassword} className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2"><Lock className="w-5 h-5 text-blue-400" /> Passwort ändern</h3>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Aktuelles Passwort</label>
                <input type={showPw ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white" required />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Neues Passwort</label>
                <input type={showPw ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Min. 6 Zeichen"
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-slate-500" required />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Bestätigen</label>
                <input type={showPw ? "text" : "password"} value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-800/60 border rounded-xl focus:outline-none focus:ring-2 text-white ${confirmNewPassword && newPassword !== confirmNewPassword ? "border-red-500/50" : "border-slate-700/60"}`} required />
              </div>
              <button type="submit" disabled={saving} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 rounded-xl font-medium transition-colors flex items-center gap-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />} Ändern
              </button>
            </form>
            <hr className="border-slate-700/50" />
            <form onSubmit={handleChangeEmail} className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2"><Mail className="w-5 h-5 text-blue-400" /> E-Mail ändern</h3>
              <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white" required />
              <input type="password" value={emailPassword} onChange={(e) => setEmailPassword(e.target.value)} placeholder="Passwort zur Bestätigung"
                className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-slate-500" required />
              <button type="submit" disabled={saving} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 rounded-xl font-medium transition-colors flex items-center gap-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />} E-Mail ändern
              </button>
            </form>
            <hr className="border-slate-700/50" />
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-red-400" /> Account löschen</h3>
              <p className="text-slate-400 text-sm mb-4">Alle Daten werden permanent gelöscht.</p>
              {!showDeleteConfirm ? (
                <button onClick={() => setShowDeleteConfirm(true)} className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl font-medium">Account löschen</button>
              ) : (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl space-y-3">
                  <p className="text-red-400 font-medium">⚠️ Bist du sicher?</p>
                  <input type="password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} placeholder="Passwort"
                    className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white" />
                  <div className="flex gap-3">
                    <button onClick={() => { setShowDeleteConfirm(false); setDeletePassword(""); }} className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl">Abbrechen</button>
                    <button onClick={async () => {
                      if (!deletePassword) return;
                      setSaving(true);
                      try { await deleteUserAccount(deletePassword); router.push("/"); }
                      catch { showMessage("error", "Löschen fehlgeschlagen"); }
                      finally { setSaving(false); }
                    }} disabled={saving || !deletePassword} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-slate-700 rounded-xl font-medium">
                      {saving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Löschen"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== SETTINGS ===== */}
        {activeTab === "settings" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl">
              <div className="flex items-center gap-3"><Bell className="w-5 h-5 text-blue-400" /><div><p className="font-medium">Benachrichtigungen</p><p className="text-xs text-slate-400">Lern-Erinnerungen</p></div></div>
              <button onClick={async () => { const v = !notifications; setNotifications(v); await updateProfile({ settings: { ...user.settings, notifications: v } }); }}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? "bg-blue-500" : "bg-slate-600"}`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications ? "translate-x-6" : "translate-x-0.5"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl">
              <div className="flex items-center gap-3"><Users className="w-5 h-5 text-amber-400" /><div><p className="font-medium">Bestenliste</p><p className="text-xs text-slate-400">{user.leaderboardOptIn ? "Sichtbar" : "Deaktiviert"}</p></div></div>
              <button onClick={async () => { await updateProfile({ leaderboardOptIn: !user.leaderboardOptIn }); }}
                className={`w-12 h-6 rounded-full transition-colors relative ${user.leaderboardOptIn ? "bg-amber-500" : "bg-slate-600"}`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${user.leaderboardOptIn ? "translate-x-6" : "translate-x-0.5"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl">
              <div className="flex items-center gap-3"><Palette className="w-5 h-5 text-violet-400" /><div><p className="font-medium">Design</p><p className="text-xs text-slate-400">Dunkel</p></div></div>
              <span className="px-3 py-1 bg-slate-700 text-slate-400 text-xs rounded-full">Dark Mode</span>
            </div>
            <div className="p-4 bg-slate-800/40 rounded-xl">
              <div className="flex items-center gap-3 mb-2"><BookOpen className="w-5 h-5 text-green-400" /><div><p className="font-medium">Gespeicherte Module</p><p className="text-xs text-slate-400">{user.savedModules?.length || 0}</p></div></div>
              {user.savedModules && user.savedModules.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 mt-2">{user.savedModules.map((s) => <span key={s} className="px-2.5 py-1 bg-blue-500/15 text-blue-400 text-xs rounded-lg">{s}</span>)}</div>
              ) : <p className="text-xs text-slate-600 italic">Keine</p>}
            </div>
          </div>
        )}

        {/* ===== STATS ===== */}
        {activeTab === "stats" && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-800/40 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Level {levelInfo.level} — {levelInfo.title}</h3>
                <span className="text-xs text-slate-400">{levelInfo.xpToNext} XP bis Level {levelInfo.level + 1}</span>
              </div>
              <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all" style={{ width: `${levelInfo.progress}%` }} />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 bg-slate-800/40 rounded-xl text-center"><Flame className="w-6 h-6 text-orange-400 mx-auto mb-1" /><p className="text-xl font-bold">{user.streak}</p><p className="text-[10px] text-slate-500 uppercase">Streak</p></div>
              <div className="p-4 bg-slate-800/40 rounded-xl text-center"><Zap className="w-6 h-6 text-yellow-400 mx-auto mb-1" /><p className="text-xl font-bold">{user.totalXP}</p><p className="text-[10px] text-slate-500 uppercase">XP</p></div>
              <div className="p-4 bg-slate-800/40 rounded-xl text-center"><Trophy className="w-6 h-6 text-violet-400 mx-auto mb-1" /><p className="text-xl font-bold">{user.completedModules.length}</p><p className="text-[10px] text-slate-500 uppercase">Module</p></div>
              <div className="p-4 bg-slate-800/40 rounded-xl text-center"><BookOpen className="w-6 h-6 text-green-400 mx-auto mb-1" /><p className="text-xl font-bold">{Object.values(user.completedLessons).flat().length}</p><p className="text-[10px] text-slate-500 uppercase">Lektionen</p></div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">🏆 Erfolge</h3>
              <div className="flex flex-wrap gap-1.5">
                {user.streak >= 3 && <span className="px-2.5 py-1 bg-orange-500/15 text-orange-400 text-xs rounded-lg">🔥 3+ Streak</span>}
                {user.streak >= 7 && <span className="px-2.5 py-1 bg-red-500/15 text-red-400 text-xs rounded-lg">🔥 7 Streak</span>}
                {user.streak >= 30 && <span className="px-2.5 py-1 bg-amber-500/15 text-amber-400 text-xs rounded-lg">👑 30 Streak</span>}
                {user.completedModules.length >= 1 && <span className="px-2.5 py-1 bg-green-500/15 text-green-400 text-xs rounded-lg">🎯 1 Modul</span>}
                {user.completedModules.length >= 5 && <span className="px-2.5 py-1 bg-blue-500/15 text-blue-400 text-xs rounded-lg">🎓 5 Module</span>}
                {user.totalXP >= 100 && <span className="px-2.5 py-1 bg-purple-500/15 text-purple-400 text-xs rounded-lg">⭐ 100 XP</span>}
                {user.totalXP >= 500 && <span className="px-2.5 py-1 bg-cyan-500/15 text-cyan-400 text-xs rounded-lg">💎 500 XP</span>}
                {user.totalXP >= 1000 && <span className="px-2.5 py-1 bg-yellow-500/15 text-yellow-400 text-xs rounded-lg">🏅 1000 XP</span>}
                {user.completedModules.length === 0 && user.streak < 3 && user.totalXP < 100 && <span className="text-xs text-slate-600 italic">Spiele Erfolge frei! 🎮</span>}
              </div>
            </div>
            <div className="p-4 bg-slate-800/40 rounded-xl">
              <h3 className="font-semibold mb-2">📋 Info</h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Mitglied seit</span><span>{new Date(user.createdAt).toLocaleDateString("de-DE")}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Letzte Aktivität</span><span>{new Date(user.lastActive).toLocaleDateString("de-DE")}</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
