import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { contact, contactReasons } from '../content'

type Fields = { name: string; email: string; reason: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMPTY: Fields = { name: '', email: '', reason: contactReasons[0], message: '' }

function validate(f: Fields): Errors {
  const errors: Errors = {}
  if (f.name.trim().length < 2) errors.name = 'Tell us who you are.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
    errors.email = 'That address will not reach you.'
  if (f.message.trim().length < 12) errors.message = 'A sentence or two, so we know how to help.'
  return errors
}

const fieldClass =
  'w-full rounded-xl border bg-ink-900/70 px-4 py-3 text-sm text-bone-50 placeholder:text-bone-600 transition-colors duration-300 focus:border-steel-500 focus:outline-none'

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus('sending')

    // No endpoint configured yet: hand the message to the visitor's mail app so
    // the form still works on a site with no server behind it.
    if (!contact.formEndpoint) {
      const body = `${fields.message}\n\n— ${fields.name} (${fields.email})`
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        `${fields.reason} — ${fields.name}`,
      )}&body=${encodeURIComponent(body)}`
      setStatus('sent')
      setFields(EMPTY)
      return
    }

    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setFields(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 110, damping: 20 }}
        className="flex h-full flex-col items-start justify-center gap-5 rounded-3xl border border-steel-500/25 bg-steel-500/[0.06] p-8 sm:p-10"
      >
        <CheckCircle size={34} weight="light" className="text-steel-300" />
        <div>
          <h3 className="display text-2xl text-bone-50">Message away</h3>
          <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-bone-400">
            {contact.formEndpoint
              ? 'Somebody checks this inbox every couple of days. If it is urgent, call the clubhouse instead.'
              : 'Your mail app should be open with the message ready. Hit send and it lands in the clubhouse inbox.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="rounded-full border border-bone-600/40 px-5 py-2.5 text-sm font-semibold text-bone-200 transition-all duration-300 hover:border-bone-400 hover:text-bone-50 active:-translate-y-px"
        >
          Write another
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="mrt-name" className="font-mono text-[0.625rem] uppercase tracking-wider text-bone-400">
            Your name
          </label>
          <input
            id="mrt-name"
            value={fields.name}
            onChange={(e) => set('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'mrt-name-error' : undefined}
            placeholder="First and last"
            className={`${fieldClass} ${errors.name ? 'border-red-400/60' : 'border-bone-600/30'}`}
          />
          {errors.name && (
            <p id="mrt-name-error" className="flex items-center gap-1.5 text-xs text-red-300">
              <WarningCircle size={13} weight="bold" />
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="mrt-email" className="font-mono text-[0.625rem] uppercase tracking-wider text-bone-400">
            Email
          </label>
          <input
            id="mrt-email"
            type="email"
            value={fields.email}
            onChange={(e) => set('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'mrt-email-error' : undefined}
            placeholder="you@example.com"
            className={`${fieldClass} ${errors.email ? 'border-red-400/60' : 'border-bone-600/30'}`}
          />
          {errors.email && (
            <p id="mrt-email-error" className="flex items-center gap-1.5 text-xs text-red-300">
              <WarningCircle size={13} weight="bold" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="mrt-reason" className="font-mono text-[0.625rem] uppercase tracking-wider text-bone-400">
          What is this about
        </label>
        <select
          id="mrt-reason"
          value={fields.reason}
          onChange={(e) => set('reason', e.target.value)}
          className={`${fieldClass} border-bone-600/30 appearance-none bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%236f6d67'%3E%3Cpath d='M8 11L3 5.5h10z'/%3E%3C/svg%3E\")",
          }}
        >
          {contactReasons.map((r) => (
            <option key={r} value={r} className="bg-ink-900">
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="mrt-message" className="font-mono text-[0.625rem] uppercase tracking-wider text-bone-400">
          Message
        </label>
        <textarea
          id="mrt-message"
          rows={5}
          value={fields.message}
          onChange={(e) => set('message', e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'mrt-message-error' : 'mrt-message-help'}
          placeholder="What do you ride, or what do you need?"
          className={`${fieldClass} resize-y ${errors.message ? 'border-red-400/60' : 'border-bone-600/30'}`}
        />
        {errors.message ? (
          <p id="mrt-message-error" className="flex items-center gap-1.5 text-xs text-red-300">
            <WarningCircle size={13} weight="bold" />
            {errors.message}
          </p>
        ) : (
          <p id="mrt-message-help" className="text-xs text-bone-600">
            If you are asking for help for a family, leave a phone number too.
          </p>
        )}
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/5 p-3 text-xs text-red-200"
          >
            <WarningCircle size={15} weight="bold" className="mt-px shrink-0" />
            That did not go through.{' '}
            {contact.phone ? `Call ${contact.phone} or email ` : 'Email '}
            {contact.email} and we will pick it up.
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-bone-50 px-7 py-3.5 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-steel-300 active:-translate-y-px disabled:cursor-wait disabled:opacity-70"
      >
        {status === 'sending' ? (
          <>
            <span className="shimmer absolute inset-0" aria-hidden />
            Sending
          </>
        ) : (
          <>
            Send it
            <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  )
}
