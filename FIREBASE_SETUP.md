# Firebase + E-Mail Setup — LearnHub

## 1. Firebase Console

### Authentication
1. https://console.firebase.google.com → Projekt `learnhub-eca26`
2. **Authentication** → **Sign-in method** → **Email/Password** → ✅ Aktivieren

### Firestore Database
1. **Firestore Database** → **Create database**
2. **Start in test mode**
3. Region: **eur3 (Frankfurt)** 🇪🇺 (DSGVO — Daten bleiben in EU)

### Security Rules
1. **Firestore** → **Rules** Tab
2. Inhalt aus `firestore.rules` einfügen → **Publish**

---

## 2. E-Mail-Versand (Resend)

### Warum Resend?
- ✅ 3000 E-Mails/Monat **kostenlos**
- ✅ Keine Kreditkarte nötig
- ✅ Professionelle HTML-E-Mails
- ✅ EU-Server verfügbar

### Setup (3 Minuten):
1. → https://resend.com/signup
2. E-Mail + Passwort → Account erstellen
3. → **API Keys** → **Create API Key**
4. Name: `learnhub` → **Create**
5. Key kopieren (startet mit `re_`)

### In `.env.local` eintragen:
```env
RESEND_API_KEY=re_xxxxx
```

### E-Mail-Absender (Sandbox vs. Produktion):
- **Sofort testbar:** Absender ist `onboarding@resend.dev` (Resend Test-Domain)
- **Eigene Domain:** In Resend → **Domains** → **Add Domain** → DNS-Einträge setzen
  - Dann in `app/api/send-code/route.ts` die `from`-Adresse ändern

### Wichtig (Resend Free Tier):
- Sandbox: E-Mails gehen **nur an deine eigene E-Mail-Adresse**
- Für alle Empfänger: **Eigene Domain verifizieren** (kostenlos, nur DNS-Einträge)

---

## 3. Vercel Environment Variables

In Vercel → Projekt → **Settings** → **Environment Variables**:

```
RESEND_API_KEY = re_xxxxx
NEXT_PUBLIC_FIREBASE_API_KEY = ***
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = learnhub-eca26.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = learnhub-eca26
... (alle aus .env.local)
```

---

## 4. Datenstruktur Firestore

```
users/{uid}
├── username, email, avatar, bio, displayName
├── streak, totalXP, lastActive, createdAt
├── completedModules[], completedLessons{}, quizScores{}
├── savedModules[], settings{}
└── data/
    ├── progress/
    └── flashcards/

usernames/{username}
└── uid, createdAt

pending_verifications/{email}
└── code, username, passwordHash, attempts, expiresAt
```

---

## 5. DSGVO

- [x] Daten in EU (Frankfurt eur3)
- [x] User sieht nur eigene Daten (Firestore Rules)
- [x] Account-Löschung in Profil → Sicherheit
- [x] E-Mail-Bestätigung erforderlich
- [x] Passwörter bei Firebase Auth gehasht
- [x] Pending Verifications werden nach Verifizierung gelöscht
- [ ] Datenschutzerklärung: Firebase + Resend erwähnen

---

## 6. Testen

1. App starten: `npm run dev`
2. Registrieren → E-Mail mit 6-stelligem Code kommt an
3. Code eingeben → Account erstellt → eingeloggt
