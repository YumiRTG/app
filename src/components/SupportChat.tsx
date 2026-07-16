import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { COMMUNITY } from '@/config/community'
import { asset } from '@/lib/assets'
import { supportReply, welcomeMessage, type ChatMessage } from '@/lib/supportBot'

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export default function SupportChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: uid(), role: 'assistant', text: welcomeMessage(), at: Date.now() },
  ])
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    inputRef.current?.focus()
  }, [open, messages, typing])

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === '#support') setOpen(true)
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    const onOpen = () => setOpen(true)
    window.addEventListener('dd-open-support', onOpen)
    return () => {
      window.removeEventListener('hashchange', openFromHash)
      window.removeEventListener('dd-open-support', onOpen)
    }
  }, [])

  const send = (text?: string) => {
    const value = (text ?? input).trim()
    if (!value || typing) return

    const userMsg: ChatMessage = {
      id: uid(),
      role: 'user',
      text: value,
      at: Date.now(),
    }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTyping(true)

    window.setTimeout(() => {
      const replyText = supportReply(value)
      setMessages((m) => [
        ...m,
        { id: uid(), role: 'assistant', text: replyText, at: Date.now() },
      ])
      setTyping(false)
    }, 350 + Math.min(500, value.length * 8))
  }

  const quick = ['How do I download?', 'Account ID login', 'Daily rewards', 'Discord?']

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-[150] p-0 m-0 border-0 outline-none cursor-pointer bg-transparent shadow-none group"
        style={{ background: 'transparent', boxShadow: 'none' }}
        aria-label={open ? 'Close support chat' : 'Open support chat'}
      >
        <span className="relative block w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] bg-transparent transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
          <img
            src={asset('support-bot.png')}
            alt="Support"
            className="w-full h-full object-contain object-center bg-transparent pointer-events-none select-none"
            draggable={false}
          />
          {open && (
            <span className="absolute top-1 right-1 flex items-center justify-center w-7 h-7 rounded-full font-display text-lg text-white bg-black/50 leading-none">
              ×
            </span>
          )}
        </span>
      </button>

      {open && (
        <div
          className="fixed bottom-20 right-4 sm:right-5 z-[150] w-[min(100vw-1.5rem,380px)] h-[min(70vh,520px)] flex flex-col overflow-hidden rounded-2xl"
          style={{
            background: 'linear-gradient(165deg, rgba(26,66,48,0.97), rgba(12,26,18,0.98))',
            border: '1px solid rgba(240,193,77,0.28)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          }}
          role="dialog"
          aria-label="Support chat"
        >
          <div className="px-4 py-3 border-b border-white/10 flex items-start justify-between gap-2 shrink-0">
            <div>
              <p className="font-display text-lg text-white tracking-wide">SUPPORT</p>
              <p className="font-body text-[11px] text-[#d2c4a0]/75 mt-0.5">
                Free helper · always online
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[#d2c4a0] hover:text-white bg-transparent border-none cursor-pointer text-xl leading-none px-1"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="px-3 py-2 border-b border-white/5 flex flex-wrap gap-2 shrink-0">
            <CommunityChip label="Discord" href={COMMUNITY.discordUrl} />
            <CommunityChip label="Forum" href={COMMUNITY.forumUrl} />
            <Link
              to="/download"
              onClick={() => setOpen(false)}
              className="font-ui text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full no-underline border border-[#f0c14d]/25 text-[#f0c14d] hover:bg-[#f0c14d]/10"
            >
              Download
            </Link>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                  style={
                    m.role === 'user'
                      ? {
                          background: 'linear-gradient(135deg, #e85d04, #b84302)',
                          color: '#fff',
                          borderBottomRightRadius: 6,
                        }
                      : {
                          background: 'rgba(255,255,255,0.07)',
                          color: '#f3e8cf',
                          border: '1px solid rgba(240,193,77,0.12)',
                          borderBottomLeftRadius: 6,
                        }
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-2.5 text-xs text-[#d2c4a0] bg-white/5 border border-white/10">
                  Thinking…
                </div>
              </div>
            )}
          </div>

          <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
            {quick.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                disabled={typing}
                className="font-body text-[11px] px-2.5 py-1 rounded-full border border-white/10 text-[#d2c4a0] bg-transparent cursor-pointer hover:border-[#f0c14d]/40 hover:text-[#f0c14d] disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            className="p-3 border-t border-white/10 flex gap-2 shrink-0"
            onSubmit={(e) => {
              e.preventDefault()
              void send()
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about download, login…"
              disabled={typing}
              className="flex-1 rounded-xl bg-black/25 border border-white/10 px-3 py-2.5 text-sm text-[#f3e8cf] outline-none focus:border-[#f0c14d]/50 placeholder:text-white/30"
            />
            <button
              type="submit"
              disabled={typing || !input.trim()}
              className="btn-primary !px-4 !py-2.5 !text-[0.7rem] disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}

function CommunityChip({ label, href }: { label: string; href: string }) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-ui text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full no-underline border border-[#f0c14d]/25 text-[#f0c14d] hover:bg-[#f0c14d]/10"
      >
        {label}
      </a>
    )
  }
  return (
    <span
      className="font-ui text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 text-white/35 cursor-default"
      title="Coming soon"
    >
      {label} · soon
    </span>
  )
}
