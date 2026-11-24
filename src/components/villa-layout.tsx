import { useState, type ReactNode } from "react";
import { Facebook, Instagram, Leaf, Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Gallery", "/gallery"],
  ["Location", "/location"],
  ["Contact", "/contact"],
] as const;

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="/"
      className="flex shrink-0 items-center gap-3 text-cream"
      aria-label="Budhanilkantha Villa home"
    >
      <span className="grid size-9 place-items-center border border-gold/60 text-gold">
        <Leaf size={19} strokeWidth={1.5} />
      </span>
      <span
        className={
          compact
            ? "font-serif text-base"
            : "text-[11px] font-medium leading-[1.15] tracking-[0.18em]"
        }
      >
        {compact ? (
          "Budhanilkantha Villa"
        ) : (
          <>
            <span className="block">BUDHANILKANTHA</span>
            <span className="block text-gold">VILLA</span>
          </>
        )}
      </span>
    </a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cream/10 bg-deep/65 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8"
        aria-label="Main navigation"
      >
        <Brand />
        <div className="hidden items-center gap-9 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="relative py-2 text-xs font-medium text-cream/80 transition-colors duration-250 hover:text-gold focus-visible:text-gold focus-visible:outline-none after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100"
            >
              {label}
            </a>
          ))}
        </div>
        <Button asChild variant="dark" className="hidden md:inline-flex">
          <a href="/contact">Book a Visit</a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-cream hover:bg-cream/10 hover:text-gold md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>
      {open && (
        <div className="border-t border-cream/10 bg-deep px-5 py-5 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-cream/10 py-3 text-sm text-cream/80"
              >
                {label}
              </a>
            ))}
            <Button asChild variant="gold" className="mt-4">
              <a href="/contact" onClick={() => setOpen(false)}>
                Book a Visit
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-near-black py-7 text-cream/60">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="footer-wordmark-wrap my-6 w-full overflow-hidden">
          <a
            href="/"
            className="footer-giant-wordmark-link block w-full text-center outline-none"
            aria-label="Go to home page"
          >
            <div className="footer-giant-wordmark flex select-none justify-center">
              <span className="wordmark-word wordmark-word-1">BUDHANILKANTHA</span>
              <span className="wordmark-space">&nbsp;</span>
              <span className="wordmark-word wordmark-word-2">VILLA</span>
            </div>
          </a>
        </div>
        <div className="grid items-center gap-6 border-t border-cream/10 pt-6 text-center text-xs md:grid-cols-3 md:text-left">
          <Brand compact />
          <p className="md:text-center">© 2026 Budhanilkantha Villa. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
            <a href="/" className="hover:text-gold">
              Privacy Policy
            </a>
            <a href="/" className="hover:text-gold">
              Terms &amp; Conditions
            </a>
            <span className="h-4 w-px bg-cream/20" />
            <a href="/" aria-label="Facebook" className="hover:text-gold">
              <Facebook size={16} />
            </a>
            <a href="/" aria-label="Instagram" className="hover:text-gold">
              <Instagram size={16} />
            </a>
            <a href="/" aria-label="WhatsApp" className="hover:text-gold">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function VillaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}
