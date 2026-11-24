import {
  ArrowRight,
  Leaf,
  MapPin,
  Mountain,
  Play,
  ShieldCheck,
  Home,
  Sparkles,
  Trees,
  Waves,
  SunMedium,
  UtensilsCrossed,
  Presentation,
  Zap,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroAsset, statItems, amenities } from "@/components/villa-data";
import { VillaLayout } from "@/components/villa-layout";

function Hero() {
  return (
    <section className="relative flex min-h-180 items-center overflow-hidden bg-deep lg:min-h-screen">
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
              <a href="/contact">
                Book a Private Visit <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="heroOutline" size="lg">
              <a href="/about">
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
    </section>
  );
}

function Overview() {
  return (
    <section className="bg-cream py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[3fr_2fr] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.24em] text-sage">ABOUT THE VILLA</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-tight text-deep sm:text-5xl">
            Thoughtfully Designed for a Better Lifestyle
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-deep/70">
            Every corner of this villa is crafted with attention to detail, offering the perfect
            space for relaxation, privacy and quality family time.
          </p>
          <Button asChild variant="dark" className="mt-8">
            <a href="/about">
              Discover the villa <ArrowRight />
            </a>
          </Button>
        </div>
        <img
          src={heroAsset}
          alt="Budhanilkantha Villa exterior"
          loading="lazy"
          className="h-90 w-full rounded-md object-cover"
        />
      </div>
    </section>
  );
}

function HomeFeatures() {
  const icons = [Mountain, ShieldCheck, Home, Leaf, MapPin];
  const amenityIcons = [
    Trees,
    Waves,
    SunMedium,
    UtensilsCrossed,
    Presentation,
    ShieldCheck,
    Zap,
    Wifi,
  ];
  return (
    <>
      <section className="bg-sage text-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-cream/15 px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5 lg:px-8">
          {statItems.map(({ title, text }, index) => {
            const Icon = icons[index];
            return (
              <div
                key={title}
                className="flex min-h-44 flex-col items-center justify-center px-5 py-7 text-center"
              >
                <Icon className="mb-4 text-gold" size={30} strokeWidth={1.5} />
                <h2 className="text-sm font-semibold">{title}</h2>
                <p className="mt-2 max-w-48 text-xs leading-5 text-cream/65">{text}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.24em] text-sage">AMENITIES</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-deep sm:text-4xl">
              Everything You Need for a Comfortable Life
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 border-l border-t border-deep/10 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((label, index) => {
              const Icon = amenityIcons[index];
              return (
                <div
                  key={label}
                  className="flex min-h-40 flex-col items-center justify-center gap-4 border-b border-r border-deep/10 p-6 text-center"
                >
                  <Icon className="text-gold" size={30} strokeWidth={1.5} />
                  <h3 className="text-sm font-medium text-deep">{label}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export function HomePage() {
  return (
    <VillaLayout>
      <Hero />
      <HomeFeatures />
      <Overview />
    </VillaLayout>
  );
}
