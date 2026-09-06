import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react'

type Target = { userId: string; displayName: string; worldId: string }
type Reply = { ok: boolean; error?: string; target?: Target; hasMessage?: boolean }
const reasons = [
  ['harassment', 'Beleidigung / Belästigung'], ['spam', 'Spam'], ['cheating', 'Cheating'],
  ['profile', 'Unangemessenes Profil'], ['other', 'Sonstiges'],
]
const messages: Record<string, string> = {
  already_reported: 'Spieler bereits gemeldet.',
  report_link_expired: 'Dieser Meldelink ist abgelaufen. Öffne das Spielerprofil im Spiel und wähle erneut „Melden“.',
  invalid_report_link: 'Öffne das Spielerprofil im Spiel und wähle „Melden“, um eine Meldung zu erstellen.',
  player_not_found: 'Dieser Spieler ist nicht mehr verfügbar.',
  report_limit: 'Bitte warte etwas. Du kannst höchstens acht Spieler pro Tag melden.',
  message_unavailable: 'Die Chatnachricht ist nicht mehr verfügbar. Öffne das Profil im Spiel erneut ohne die Nachricht.',
  message_forbidden: 'Du hast keinen Zugriff mehr auf diese Chatnachricht.',
  invalid_reason: 'Bitte wähle einen Grund aus.',
}
async function request(body: object, signal?: AbortSignal): Promise<Reply> {
  try {
    const response = await fetch('/api/player-report', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal,
    })
    return await response.json()
  } catch { return { ok: false, error: 'service_unavailable' } }
}

export default function ReportPlayerPage() {
  const [ticket] = useState(() => new URLSearchParams(window.location.hash.slice(1)).get('ticket') ?? '')
  const validTicket = /^[a-f0-9]{64}$/.test(ticket)
  const [target, setTarget] = useState<Target | null>(null)
  const [hasMessage, setHasMessage] = useState(false)
  const [error, setError] = useState(validTicket ? '' : 'invalid_report_link')
  const [loading, setLoading] = useState(validTicket)
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [reason, setReason] = useState('')
  const [comment, setComment] = useState('')
  const [attempt, setAttempt] = useState<{ reason: string; comment: string; requestId: string } | null>(null)
  const [reload, setReload] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    if (!validTicket) return
    void request({ action: 'get', ticket }, controller.signal).then(result => {
      if (controller.signal.aborted) return
      if (result.ok && result.target) { setTarget(result.target); setHasMessage(!!result.hasMessage) }
      else setError(result.error ?? 'service_unavailable')
      setLoading(false)
    })
    return () => controller.abort()
  }, [ticket, validTicket, reload])
  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (busy || sent || error === 'already_reported') return
    if (!reason) { setError('invalid_reason'); return }
    // Freeze a failed request so a lost success response cannot turn a retry into a second report.
    const payload = attempt ?? { reason, comment, requestId: crypto.randomUUID().replaceAll('-', '') }
    setAttempt(payload); setBusy(true); setError('')
    const result = await request({ action: 'report', ticket, ...payload })
    setBusy(false)
    if (result.ok) { setSent(true); window.history.replaceState(null, '', window.location.pathname) }
    else setError(result.error ?? 'service_unavailable')
  }
  const locked = busy || !!attempt || error === 'already_reported'
  const message = messages[error] ?? 'Die Verbindung ist momentan nicht verfügbar. Bitte versuche es erneut.'
  return (
    <div className="page-shell font-body">
      <div className="container-dd max-w-3xl pb-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8"><ArrowLeft size={16} /> Zur Homepage</Link>
        <section className="rounded-2xl border border-slate-700/60 bg-[#101819]/95 p-6 sm:p-10 shadow-2xl" aria-labelledby="report-title">
          <div className="flex items-center gap-3 text-teal-300 mb-4"><ShieldAlert size={24} /><span className="text-xs uppercase tracking-[.2em]">Dino Dominion · Spielermeldung</span></div>
          <h1 id="report-title" className="font-display text-3xl sm:text-4xl text-slate-100 mb-3">{sent ? 'Meldung eingegangen' : 'Spieler melden'}</h1>
          {sent ? <div role="status" className="mt-7 flex gap-3 text-slate-200"><CheckCircle2 className="shrink-0 text-teal-300" /><p>Vielen Dank. Deine Meldung wird an das Moderationsteam weitergeleitet. Du kannst jetzt ins Spiel zurückkehren.</p></div> : <>
            <p className="text-slate-400 leading-relaxed mb-7">Melde einen Regelverstoß. Jeder Spieler kann insgesamt nur einmal gemeldet werden.</p>
            {loading && <p role="status" className="text-slate-300 py-8">Spieler wird geladen …</p>}
            {!loading && target && <form onSubmit={submit}>
              <div className="rounded-lg bg-black/25 border border-slate-700/60 p-4 mb-7">
                <p className="text-xl font-semibold text-slate-100 break-words">{target.displayName}</p>
                <p className="text-sm text-slate-400 mt-1">Welt: {target.worldId === 'dev8d' ? 'Genesis' : target.worldId === 'eden_prime' ? 'Eden Prime' : target.worldId}</p>
                <p className="text-xs text-slate-500 mt-2 break-all">Spieler-ID: {target.userId}</p>
              </div>
              <fieldset disabled={locked} className="space-y-3">
                <legend className="text-slate-200 font-semibold mb-3">Grund der Meldung</legend>
                {reasons.map(([code, label]) => <label key={code} className={`flex gap-3 items-center rounded-lg border p-3 cursor-pointer ${reason === code ? 'border-teal-600 bg-teal-950/60 text-teal-100' : 'border-slate-700/70 bg-slate-900/30 text-slate-300'}`}>
                  <input type="radio" name="reason" value={code} checked={reason === code} onChange={() => setReason(code)} className="accent-teal-400" required />{label}
                </label>)}
              </fieldset>
              <label htmlFor="report-comment" className="block text-slate-200 font-semibold mt-7 mb-3">Kommentar <span className="text-slate-500 font-normal">(optional)</span></label>
              <textarea id="report-comment" disabled={locked} maxLength={1000} rows={5} value={comment} onChange={event => setComment(event.target.value)} placeholder="Was ist passiert?" className="w-full rounded-lg border border-slate-700 bg-black/25 p-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:opacity-70" />
              <div className="text-right text-xs text-slate-500 mt-1">{comment.length}/1000</div>
              {hasMessage && <p className="text-sm text-slate-400 mt-3">Die ausgewählte Chatnachricht wird automatisch mitgeschickt.</p>}
              {error && <p role="alert" className="rounded-lg border border-amber-900/50 bg-amber-950/25 p-3 text-amber-100 mt-5">{message}</p>}
              <button disabled={busy || error === 'already_reported' || error === 'report_link_expired'} className="mt-6 w-full rounded-lg bg-[#315c5b] hover:bg-[#3c706e] px-6 py-3.5 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed">{busy ? 'Wird gesendet …' : attempt ? 'Erneut senden' : 'Meldung senden'}</button>
            </form>}
            {!loading && !target && error && <div role="alert" className="border border-slate-700 rounded-lg p-5 text-slate-200">{message}</div>}
            {!loading && !target && error === 'service_unavailable' && <button onClick={() => { setLoading(true); setError(''); setReload(value => value + 1) }} className="mt-5 rounded-lg bg-[#315c5b] px-5 py-3 text-white">Erneut laden</button>}
          </>}
        </section>
        <p className="text-xs text-slate-500 leading-relaxed mt-5 text-center">Dieses Formular öffnest du über „Melden“ im Spielerprofil. Deine Meldung ist für andere Spieler nicht sichtbar.</p>
      </div>
    </div>
  )
}
