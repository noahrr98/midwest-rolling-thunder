import { Reveal } from './Reveal'
import { about, officers } from '../content'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
      {/* Sticky heading rail against a wide reading column — no centred header. */}
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow">01 — {about.heading}</p>
            <h2 className="display mt-5 text-[clamp(2rem,5vw,3.25rem)]">{about.title}</h2>
            <p className="mt-5 max-w-[34ch] text-lg leading-relaxed text-bone-300">{about.lead}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rule mt-10 hidden pt-8 lg:block">
              <p className="eyebrow mb-5">The board</p>
              <ul className="divide-y divide-bone-600/20">
                {officers.map((o) => (
                  <li key={o.name} className="flex items-baseline justify-between gap-4 py-3">
                    <span className="text-sm text-bone-200">
                      {o.name}
                      <span className="text-bone-600"> — “{o.roadName}”</span>
                    </span>
                    <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-bone-600">
                      {o.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div>
          <div className="max-w-[64ch] space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={p} delay={i * 0.06}>
                <p className="text-base leading-relaxed text-bone-400 sm:text-lg">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* What we do: a numbered ledger, alternating indent. Not three cards. */}
          <div className="mt-16 sm:mt-20">
            <Reveal>
              <p className="eyebrow">What we do</p>
            </Reveal>
            <ol className="mt-8 divide-y divide-bone-600/20 border-t border-bone-600/30">
              {about.pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 0.08}>
                  <li
                    className={`group grid gap-3 py-8 sm:grid-cols-[auto_1fr] sm:gap-8 ${
                      i % 2 === 1 ? 'sm:pl-8 lg:pl-16' : ''
                    }`}
                  >
                    <span className="font-mono text-sm text-steel-500 transition-colors group-hover:text-steel-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="display text-xl text-bone-50 sm:text-2xl">{pillar.title}</h3>
                      <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-bone-400 sm:text-base">
                        {pillar.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Board list moves inline below the ledger on narrow screens. */}
          <Reveal>
            <div className="rule mt-14 pt-8 lg:hidden">
              <p className="eyebrow mb-5">The board</p>
              <ul className="divide-y divide-bone-600/20">
                {officers.map((o) => (
                  <li key={o.name} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                    <span className="text-sm text-bone-200">
                      {o.name}
                      <span className="text-bone-600"> — “{o.roadName}”</span>
                    </span>
                    <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-bone-600">
                      {o.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
