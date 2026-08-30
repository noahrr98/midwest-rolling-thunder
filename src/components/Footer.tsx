import { Logo } from './Logo'
import { club, contact } from '../content'

const YEAR_NOW = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="rule">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Logo size={46} />
            <span className="display text-lg leading-none">
              Midwest Rolling
              <span className="text-steel-400"> Thunder</span>
            </span>
          </div>
          <p className="mt-5 max-w-[46ch] text-sm leading-relaxed text-bone-600">
            {club.region}. Chartered {club.founded}. Every dollar we raise stays inside a ninety-mile radius of
            the clubhouse.
          </p>
        </div>

        <div className="flex flex-col gap-5 lg:items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {contact.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-bone-400 transition-colors hover:text-bone-50"
              >
                {s.label}
              </a>
            ))}
            <a href={`mailto:${contact.email}`} className="text-sm text-bone-400 transition-colors hover:text-bone-50">
              Email
            </a>
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                className="text-sm text-bone-400 transition-colors hover:text-bone-50"
              >
                {contact.phone}
              </a>
            )}
          </nav>
          <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-bone-600">
            © {YEAR_NOW} {club.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
