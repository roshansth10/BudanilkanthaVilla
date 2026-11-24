import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CarFront,
  ChevronRight,
  CircleParking,
  Facebook,
  Flower2,
  Home,
  Instagram,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Mountain,
  Play,
  Presentation,
  Ruler,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Trees,
  UtensilsCrossed,
  Wifi,
  X,
  Zap,
  Waves,
} from "lucide-react";
export { HomePage as VillaPage } from "@/pages/home-page";

import heroAsset from "@/assets/img/01_hero_exterior_sunset.jpg";
import exteriorEvening from "@/assets/img/02_villa_exterior_evening.jpg";
import exteriorDusk from "@/assets/img/03_villa_exterior_dusk.jpg";
import livingRoom from "@/assets/img/04_luxury_living_room.jpg";
import kitchen from "@/assets/img/05_modern_kitchen_dining.jpg";
import bedroom from "@/assets/img/06_master_bedroom_mountain_view.jpg";
import garden from "@/assets/img/07_landscaped_garden_lounge.jpg";
import bathroom from "@/assets/img/08_luxury_bathroom_mountain_view.jpg";
import pool from "@/assets/img/09_villa_pool_night.jpg";

const navItems = [
  ["Home", "#home"],
  ["About Us", "#about"],
  ["Gallery", "#gallery"],
  ["Location", "#location"],
  ["Contact", "#contact"],
] as const;

const photos = [
  { src: heroAsset, alt: "Budhanilkantha Villa at sunset" },
  { src: exteriorEvening, alt: "Villa exterior in the evening" },
  { src: exteriorDusk, alt: "Villa exterior at dusk" },
  { src: livingRoom, alt: "Spacious villa living room" },
  { src: kitchen, alt: "Modern kitchen and dining room" },
  { src: bedroom, alt: "Master bedroom overlooking the mountains" },
  { src: garden, alt: "Landscaped garden lounge" },
  { src: bathroom, alt: "Luxury bathroom with mountain view" },
  { src: pool, alt: "Villa pool at night" },
] as const;

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="#home"
      className="flex shrink-0 items-center text-cream"
      aria-label="Budhanilkantha Villa home"
    >
      <img
        src="/images/BV%20logo.png"
        alt="Budhanilkantha Villa"
        className={compact ? "h-8 w-auto object-contain brightness-0 invert" : "h-10 w-auto object-contain brightness-0 invert"}
      />
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cream/10 bg-deep/65 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8"
        aria-label="Main navigation"
      >
        <Brand />
        <div className="hidden items-center gap-9 md:flex">
          {navItems.map(([label, href], index) => (
            <a
              key={href}
              href={href}
              className={`relative py-2 text-xs font-medium text-cream/80 transition-colors hover:text-gold ${index === 0 ? "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gold" : ""}`}
            >
              {label}
            </a>
          ))}
        </div>
        <Button asChild variant="dark" className="hidden md:inline-flex">
          <a href="#contact">Book a Visit</a>
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
              <a href="#contact" onClick={() => setOpen(false)}>
                Book a Visit
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[720px] items-center overflow-hidden bg-deep pt-20 lg:min-h-screen"
    >
      <img
        src={heroAsset}
        alt="Budhanilkantha Villa glowing at sunset"
        className="absolute inset-0 size-full object-cover object-[62%_center]"
        fetchPriority="high"
      />
      <div className="hero-shade absolute inset-0" />
      <div className="absolute inset-0 bg-deep/20" />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-24 lg:px-8">
        <div className="max-w-2xl animate-fade-up">
          <p className="mb-5 text-xs font-semibold tracking-[0.25em] text-gold">
            LUXURY VILLA IN BUDHANILKANTHA
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-[1.03] text-cream sm:text-6xl lg:text-7xl">
            Live Close to Nature,
            <br />
            Live in <em className="text-gold">Luxury</em>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-cream/75 sm:text-base">
            Experience the perfect blend of modern architecture, natural beauty and world-class
            comfort in the serene hills of Budhanilkantha, Kathmandu.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gold" size="lg">
              <a href="#contact">
                Book a Private Visit <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="heroOutline" size="lg">
              <a href="#about">
                <Play /> Explore Villa
              </a>
            </Button>
          </div>
          <p className="mt-8 flex items-center gap-2 text-xs text-cream/80">
            <MapPin className="text-gold" size={16} strokeWidth={1.5} /> Budhanilkantha, Kathmandu,
            Nepal
          </p>
        </div>
      </div>
      <a
        href="#about"
        aria-label="Continue to villa overview"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.25em] text-cream/60 lg:flex"
      >
        DISCOVER
        <span className="h-9 w-px bg-gold" />
      </a>
    </section>
  );
}

const statItems = [
  {
    Icon: Mountain,
    title: "Scenic Surroundings",
    text: "Peaceful views of hills and lush greenery",
  },
  { Icon: ShieldCheck, title: "Secure & Private", text: "24/7 security in a gated community" },
  { Icon: Home, title: "Premium Living", text: "Spacious rooms with modern architecture" },
  { Icon: Leaf, title: "Eco Friendly", text: "Sustainable living with green environment" },
  { Icon: MapPin, title: "Prime Location", text: "Close to schools, temples and main roads" },
] as const;

function StatStrip() {
  return (
    <section className="bg-sage text-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-cream/15 px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5 lg:px-8">
        {statItems.map(({ Icon, title, text }) => (
          <div
            key={title}
            className="flex min-h-44 flex-col items-center justify-center px-5 py-7 text-center"
          >
            <Icon className="mb-4 text-gold" size={30} strokeWidth={1.5} />
            <h2 className="text-sm font-semibold">{title}</h2>
            <p className="mt-2 max-w-48 text-xs leading-5 text-cream/65">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const specs = [
  { Icon: Ruler, label: "Land Area", value: "12 Aana" },
  { Icon: Building2, label: "Built-up Area", value: "6,500 sq.ft." },
  { Icon: BedDouble, label: "Bedrooms", value: "5" },
  { Icon: Bath, label: "Bathrooms", value: "6" },
  { Icon: Home, label: "Living Rooms", value: "2" },
  { Icon: CarFront, label: "Parking", value: "3 Cars" },
] as const;

function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-cream py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[3fr_2fr] lg:items-center lg:px-8">
        <div className="animate-fade-up">
          <p className="text-xs font-semibold tracking-[0.24em] text-sage">ABOUT THE VILLA</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-tight text-deep sm:text-5xl">
            Thoughtfully Designed for a Better Lifestyle
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-deep/70">
            Every corner of this villa is crafted with attention to detail, offering the perfect
            space for relaxation, privacy and quality family time.
          </p>
          <div className="mt-9 grid gap-x-10 gap-y-2 border-y border-deep/15 py-3 sm:grid-cols-2">
            {specs.map(({ Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 border-b border-deep/10 py-3 last:border-0 sm:[&:nth-last-child(-n+2)]:border-0"
              >
                <Icon className="text-gold" size={20} strokeWidth={1.5} />
                <span className="text-xs text-deep/65">{label}</span>
                <strong className="ml-auto text-xs font-semibold text-deep">{value}</strong>
              </div>
            ))}
          </div>
        </div>
        <figure className="group relative min-h-[460px] overflow-hidden rounded-md">
          <img
            src={livingRoom}
            alt="Elegant living space inside Budhanilkantha Villa"
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-deep/15" />
          <button
            type="button"
            aria-label="Watch video tour"
            className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cream/60 bg-deep/35 text-cream backdrop-blur-md transition-transform hover:scale-105"
          >
            <Play className="mb-1 fill-gold text-gold" size={28} strokeWidth={1.5} />
            <span className="text-[10px] font-medium">Watch Video Tour</span>
          </button>
        </figure>
      </div>
    </section>
  );
}

const amenities = [
  { Icon: Trees, label: "Landscaped Garden" },
  { Icon: Waves, label: "Swimming Pool" },
  { Icon: SunMedium, label: "Rooftop Terrace" },
  { Icon: UtensilsCrossed, label: "Modern Kitchen" },
  { Icon: Presentation, label: "Home Theater" },
  { Icon: ShieldCheck, label: "24/7 Security" },
  { Icon: Zap, label: "Power Backup" },
  { Icon: Wifi, label: "Wi-Fi Connectivity" },
] as const;

function Amenities() {
  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.24em] text-sage">AMENITIES</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-deep sm:text-4xl">
            Everything You Need for a Comfortable Life
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 border-l border-t border-deep/10 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map(({ Icon, label }) => (
            <div
              key={label}
              className="group flex min-h-40 flex-col items-center justify-center gap-4 border-b border-r border-deep/10 p-6 text-center"
            >
              <Icon
                className="text-gold transition-transform duration-300 group-hover:-translate-y-1"
                size={30}
                strokeWidth={1.5}
              />
              <h3 className="text-sm font-medium text-deep">{label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-20 bg-cream py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-sage">GALLERY</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-deep sm:text-4xl">
              A closer look at villa life
            </h2>
          </div>
          <span className="hidden text-xs text-deep/50 sm:block">Scroll to explore</span>
        </div>
        <div className="mt-9 flex snap-x gap-4 overflow-x-auto pb-5 [scrollbar-color:var(--gold)_transparent]">
          {photos.map((photo, index) => (
            <figure
              key={photo.src}
              className="group relative aspect-[4/3] w-[82vw] max-w-[460px] shrink-0 snap-start overflow-hidden rounded-sm sm:w-[52vw] lg:w-[34vw]"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading={index > 2 ? "lazy" : "eager"}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-deep/70 px-4 py-3 text-xs text-cream/80 backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")} — {photo.alt}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-5 text-center">
          <Button asChild variant="dark" size="lg">
            <a href="#gallery">
              View Full Gallery <ArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function MapCard() {
  return (
    <div className="map-grid relative mt-8 h-56 overflow-hidden rounded-md bg-cream">
      <div className="absolute left-[12%] top-[28%] h-px w-[80%] rotate-[-8deg] bg-gold/50" />
      <div className="absolute left-[38%] top-0 h-[120%] w-px rotate-[18deg] bg-sage/30" />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-sm bg-deep px-4 py-3 text-cream shadow-xl">
        <MapPin className="text-gold" />
        <span>
          <strong className="block text-xs">Budhanilkantha Villa</strong>
          <small className="text-[10px] text-cream/60">Kathmandu, Nepal</small>
        </span>
      </div>
    </div>
  );
}

function BookingForm() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }
  const fieldClass =
    "min-h-11 rounded-sm border border-cream/20 bg-deep/15 px-3 text-sm text-cream outline-none placeholder:text-cream/45 focus:border-gold";
  return (
    <div id="contact" className="scroll-mt-24 rounded-md bg-sage p-6 sm:p-9">
      <p className="text-xs font-semibold tracking-[0.24em] text-gold">BOOK A PRIVATE VISIT</p>
      <h2 className="mt-3 font-serif text-3xl font-semibold text-cream">
        Come see it for yourself.
      </h2>
      <p className="mt-3 max-w-lg text-sm leading-6 text-cream/65">
        We would love to show you around. Fill out the form and we will get back to you.
      </p>
      <form onSubmit={submit} className="mt-7 grid gap-3 sm:grid-cols-2">
        <label className="sr-only" htmlFor="name">
          Your Name
        </label>
        <input id="name" name="name" required placeholder="Your Name" className={fieldClass} />
        <label className="sr-only" htmlFor="phone">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="Phone Number"
          className={fieldClass}
        />
        <label className="sr-only" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email Address"
          className={fieldClass}
        />
        <label className="sr-only" htmlFor="date">
          Preferred Date
        </label>
        <input id="date" name="date" type="date" required className={`${fieldClass} scheme-dark`} />
        <label className="sr-only" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Message"
          className={`${fieldClass} py-3 sm:col-span-2`}
        />
        <Button type="submit" variant="gold" size="lg" className="w-full sm:col-span-2">
          Submit Request <ArrowRight />
        </Button>
      </form>
      {sent && (
        <div
          role="status"
          className="mt-4 flex items-center gap-2 rounded-sm border border-gold/40 bg-deep/20 px-4 py-3 text-sm text-cream"
        >
          <Sparkles className="text-gold" size={18} /> Thank you. Your private visit request has
          been received.
        </div>
      )}
    </div>
  );
}

function LocationBooking() {
  const distances = [
    ["Budhanilkantha Temple", "2 mins"],
    ["Ring Road", "5 mins"],
    ["Airport", "25 mins"],
    ["Thamel", "20 mins"],
  ] as const;
  return (
    <section id="location" className="scroll-mt-20 bg-deep py-20 text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.24em] text-gold">LOCATION</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold">Budhanilkantha, Kathmandu</h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-cream/65">
            A peaceful and prestigious area with easy access to schools, temples, shopping and the
            city.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {distances.map(([place, time]) => (
              <div
                key={place}
                className="flex items-center justify-between border-b border-cream/15 pb-3 text-xs"
              >
                <span className="flex items-center gap-2 text-cream/75">
                  <MapPin className="text-gold" size={14} />
                  {place}
                </span>
                <strong className="text-gold">{time}</strong>
              </div>
            ))}
          </div>
          <MapCard />
        </div>
        <BookingForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-near-black py-7 text-cream/60">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 text-center text-xs md:grid-cols-3 md:text-left lg:px-8">
        <Brand compact />
        <p className="md:text-center">© 2026 Budhanilkantha Villa. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
          <a href="#home" className="hover:text-gold">
            Privacy Policy
          </a>
          <a href="#home" className="hover:text-gold">
            Terms &amp; Conditions
          </a>
          <span className="h-4 w-px bg-cream/20" />
          <a href="#home" aria-label="Facebook" className="hover:text-gold">
            <Facebook size={16} />
          </a>
          <a href="#home" aria-label="Instagram" className="hover:text-gold">
            <Instagram size={16} />
          </a>
          <a href="#home" aria-label="WhatsApp" className="hover:text-gold">
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export function VillaPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <StatStrip />
        <About />
        <Amenities />
        <Gallery />
        <LocationBooking />
      </main>
      <Footer />
    </div>
  );
}
