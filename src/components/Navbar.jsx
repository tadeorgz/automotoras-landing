import { useEffect, useState } from 'react'
import { Menu, Car, X } from 'lucide-react'

function Navbar({ companyName, navLinks, isMenuOpen, onToggleMenu }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 pt-1 sm:top-4 sm:px-4">
      <div
        className={`mx-auto max-w-7xl rounded-[28px] border px-4 py-3 shadow-2xl shadow-black/15 backdrop-blur-2xl transition-all duration-500 sm:px-5 ${scrolled
          ? 'border-white/30 bg-slate-900/50 backdrop-blur-sm '
          : 'border-white/15 bg-white/30 backdrop-blur-sm '
          }`}
      >
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="group inline-flex items-center gap-3 transition-all duration-300">
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--brand-color)] to-[var(--brand-dark-color)] shadow-md transition-transform duration-300 group-hover:scale-105">
              <Car size={17} className="text-white" />
            </span>
            <span className={`text-sm font-extrabold tracking-tight transition-colors duration-500 sm:text-base ${scrolled ? 'text-white' : 'text-[var(--text-color)]'}`}>
              {companyName}
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex ">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-100/60 ${scrolled ? 'text-white hover:bg-white/20' : 'text-[var(--text-color)] hover:bg-stone-100/30'}  `}>
                {link.label}
              </a>
            ))}
            <a href="#contacto" className="ml-3 rounded-full bg-[var(--brand-color)] px-4 py-2 text-sm font-semibold text-white shadow transition-all duration-300 hover:bg-[var(--brand-dark-color)]">
              WhatsApp
            </a>
          </nav>

          <button
            type="button"
            className={`inline-flex items-center rounded-full border p-2.5 transition-all duration-200 md:hidden ${scrolled
              ? 'border-white/15 text-white hover:bg-white/10'
              : 'border-white/20 text-white hover:bg-white/12'
              }`}
            onClick={onToggleMenu}
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? 'mt-3 max-h-80 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="rounded-[28px] border border-white/10 bg-slate-950/92 px-4 py-4 shadow-2xl shadow-black/20 backdrop-blur-2xl">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={onToggleMenu} className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--text-color)] transition-all duration-200 hover:bg-stone-100">
                  {link.label}
                </a>
              ))}
              <a href="#contacto" onClick={onToggleMenu} className="mt-2 rounded-2xl bg-[var(--brand-color)] px-4 py-3 text-center text-sm font-semibold text-white shadow">
                WhatsApp
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
