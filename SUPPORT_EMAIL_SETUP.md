# Support email setup (so tickets reach your Gmail)

## Player reports from the game

The game opens `/report#ticket=...` from a player's profile. Firebase creates a
30-minute ticket tied to the signed-in reporter, the selected player and any
verified chat message. The website never receives the game account's login token.

`/api/player-report` forwards that ticket and the chosen reason/comment to
`profileReportWeb` in Firebase project `dinodominion-289b0` (europe-west1).
Firebase permanently allows one report per target player across all reporters;
subsequent attempts show **Spieler bereits gemeldet.** A successful submission
queues delivery even if the mail provider is temporarily unavailable.

The scheduled `deliverPlayerReports` function calls `/api/player-report-delivery`
using a Google-signed OIDC token. That endpoint accepts only the configured runtime
service account (`143942581338-compute@developer.gserviceaccount.com`) and audience
`https://app-dino-dominion.vercel.app/api/player-report-delivery`. If the production
domain or runtime identity changes, update both sides together.

Delivery reuses the existing Vercel `GMAIL_USER` / `GMAIL_APP_PASSWORD` configuration
(or the existing Resend alternative) and fixes the recipient to
`andre.miethke74@gmail.com`. No additional shared secret or client email credentials
are needed. Report data is stored server-side; the player's browser cannot select
an arbitrary recipient or impersonate another reporter.

Run `npm run test:reports` for isolated API checks. These tests mock the delivery
provider and never send real emails. The Firebase-side tests cover global report
deduplication, ticket expiry, message access and retry handling.

The chat form posts to `/api/support-email`. Without SMTP config it falls back to FormSubmit (needs a one-time activation that often lands in **Spam**).

## Recommended: Gmail App Password (reliable)

1. Google Account of **andre.miethke74@gmail.com**  
   → [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (required)
3. Search **App passwords** → create one for “Mail” / “Dino Dominion”
4. Copy the 16-character password
5. Vercel → Project **app-dino-dominion** → **Settings → Environment Variables** (Production):

| Name | Value |
|------|--------|
| `GMAIL_USER` | `andre.miethke74@gmail.com` |
| `GMAIL_APP_PASSWORD` | `xxxx xxxx xxxx xxxx` (spaces ok) |
| `SUPPORT_TO_EMAIL` | `andre.miethke74@gmail.com` |

6. **Redeploy** (Deployments → … → Redeploy)

After that, every support form submission emails you directly. Reply-To is the player’s address.

## Optional: Resend

Set `RESEND_API_KEY` from [resend.com](https://resend.com). Free tier works with `onboarding@resend.dev` to your own email.

## FormSubmit (no setup key, but activation)

If no Gmail/Resend env is set, FormSubmit is used. First time you get **Activate Form** from `formsubmit.co` (check Spam). Click once, then messages flow.

## Firestore backup

Tickets can also be stored in `supportTickets` (see `firestore.support.rules.snippet.md`).  
Firebase Console → Firestore → `supportTickets`.
