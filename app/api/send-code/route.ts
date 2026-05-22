import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, code, username } = await req.json();

    if (!email || !code || !username) {
      return NextResponse.json({ error: "Fehlende Parameter" }, { status: 400 });
    }

    // Einfache Rate-Limitierung: max 3 Codes pro E-Mail in 10 Min
    // (Zusätzlich zum client-seitigen Rate-Limit in Firestore)

    const { data, error } = await resend.emails.send({
      // Sandbox: onboarding@resend.dev (nur an eigene E-Mail)
      // Produktion: eigene Domain verifizieren → z.B. noreply@deinedomain.de
      from: "LearnHub <onboarding@resend.dev>",
      to: [email],
      subject: "LearnHub — Dein Bestätigungscode",
      html: `
        <!DOCTYPE html>
        <html lang="de">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0; padding:0; background-color:#0f172a; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a; padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="480" cellpadding="0" cellspacing="0" style="background-color:#1e293b; border-radius:16px; border:1px solid #334155; overflow:hidden;">
                  <!-- Header -->
                  <tr>
                    <td style="padding:32px 32px 0; text-align:center;">
                      <div style="font-size:48px; margin-bottom:8px;">🎓</div>
                      <h1 style="color:#f1f5f9; font-size:24px; font-weight:700; margin:0;">LearnHub</h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding:32px;">
                      <p style="color:#94a3b8; font-size:16px; margin:0 0 8px;">Hallo <strong style="color:#f1f5f9;">${username}</strong>,</p>
                      <p style="color:#94a3b8; font-size:16px; margin:0 0 24px;">dein Bestätigungscode lautet:</p>

                      <!-- Code Box -->
                      <div style="background-color:#0f172a; border:2px solid #3b82f6; border-radius:12px; padding:24px; text-align:center; margin-bottom:24px;">
                        <span style="color:#f1f5f9; font-size:40px; font-weight:700; letter-spacing:12px; font-family:monospace;">${code}</span>
                      </div>

                      <p style="color:#64748b; font-size:14px; margin:0 0 8px;">Der Code ist <strong style="color:#94a3b8;">10 Minuten</strong> gültig.</p>
                      <p style="color:#64748b; font-size:14px; margin:0;">Falls du dich nicht registriert hast, kannst du diese E-Mail ignorieren.</p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:24px 32px; border-top:1px solid #334155;">
                      <p style="color:#475569; font-size:12px; margin:0; text-align:center;">
                        LearnHub — Interaktive Lernplattform<br>
                        <a href="https://lernapp-nine.vercel.app" style="color:#3b82f6; text-decoration:none;">lernapp-nine.vercel.app</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "E-Mail konnte nicht gesendet werden" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}
