import { ArrowUpRight, EnvelopeSimple, MapPin, Phone } from '@phosphor-icons/react'
import { Reveal } from './Reveal'
import { ContactForm } from './ContactForm'
import { contact } from '../content'

const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contact.address.mapQuery,
)}`

export function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 60% at 88% 12%, rgba(74,135,188,0.14), transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <Reveal>
          <p className="eyebrow">04 — The clubhouse</p>
          <h2 className="display mt-5 max-w-[18ch] text-[clamp(2rem,5.5vw,3.25rem)]">
            Doors open Thursday. <span className="text-steel-400">Walk in.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: where and when. */}
          <div>
            <Reveal>
              <a
                href={directions}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-3xl border border-bone-50/8 bg-ink-900/60 p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-bone-50/15 sm:p-8"
              >
                <span className="flex items-start justify-between gap-4">
                  <MapPin size={22} weight="light" className="text-steel-400" />
                  <ArrowUpRight
                    size={17}
                    weight="bold"
                    className="text-bone-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone-200"
                  />
                </span>
                <address className="display mt-6 text-2xl not-italic leading-tight text-bone-50 sm:text-3xl">
                  {contact.address.line1}
                  <br />
                  {contact.address.line2}
                </address>
                <span className="mt-4 block text-sm text-bone-600">Open directions</span>
              </a>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="mt-10 divide-y divide-bone-600/20 border-t border-bone-600/30">
                {contact.hours.map((h) => (
                  <div key={h.day} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-wider text-steel-400">{h.day}</dt>
                    <dd className="text-right text-sm text-bone-300">{h.detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10 flex flex-col gap-3">
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                    className="group flex items-center gap-3 text-lg text-bone-50 transition-colors hover:text-steel-300 sm:text-xl"
                  >
                    <Phone
                      size={18}
                      weight="light"
                      className="text-bone-600 transition-colors group-hover:text-steel-400"
                    />
                    {contact.phone}
                  </a>
                )}
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-3 break-all text-lg text-bone-50 transition-colors hover:text-steel-300 sm:text-xl"
                >
                  <EnvelopeSimple
                    size={18}
                    weight="light"
                    className="shrink-0 text-bone-600 transition-colors group-hover:text-steel-400"
                  />
                  {contact.email}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: reach somebody. */}
          <Reveal delay={0.1} className="lg:pl-8">
            <div className="rounded-3xl border border-bone-50/8 bg-ink-900/40 p-6 sm:p-9">
              <h3 className="display text-xl text-bone-50 sm:text-2xl">Send the club a message</h3>
              <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-bone-400">
                Riding with us, sponsoring a run, or asking for help for a family — all of it starts here.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
