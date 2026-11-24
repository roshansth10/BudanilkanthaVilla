import { ArrowRight, Bath, BedDouble, Building2, CarFront, Home, Play, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { livingRoom, specs } from "@/components/villa-data";
import { VillaLayout } from "@/components/villa-layout";

export function AboutPage() {
  return (
    <VillaLayout>
      <section className="bg-cream py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[3fr_2fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-sage">ABOUT THE VILLA</p>
            <h1 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-tight text-deep sm:text-5xl">
              Thoughtfully Designed for a Better Lifestyle
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-deep/70">
              Every corner of this villa is crafted with attention to detail, offering the perfect
              space for relaxation, privacy and quality family time.
            </p>
            <div className="mt-9 grid gap-x-10 gap-y-2 border-y border-deep/15 py-3 sm:grid-cols-2">
              {specs.map(([label, value], index) => {
                const icon =
                  index === 1 ? (
                    <Building2 className="text-gold" size={20} strokeWidth={1.5} />
                  ) : index === 2 ? (
                    <BedDouble className="text-gold" size={20} strokeWidth={1.5} />
                  ) : index === 3 ? (
                    <Bath className="text-gold" size={20} strokeWidth={1.5} />
                  ) : index === 4 ? (
                    <Home className="text-gold" size={20} strokeWidth={1.5} />
                  ) : index === 5 ? (
                    <CarFront className="text-gold" size={20} strokeWidth={1.5} />
                  ) : (
                    <Ruler className="text-gold" size={20} strokeWidth={1.5} />
                  );
                return (
                  <div
                    key={label}
                    className="flex items-center gap-3 border-b border-deep/10 py-3 sm:nth-last-[-n+2]:border-0"
                  >
                    {icon}
                    <span className="text-xs text-deep/65">{label}</span>
                    <strong className="ml-auto text-xs font-semibold text-deep">{value}</strong>
                  </div>
                );
              })}
            </div>
          </div>
          <figure className="group relative min-h-115 overflow-hidden rounded-md">
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
              className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cream/60 bg-deep/35 text-cream backdrop-blur-md"
            >
              <Play className="mb-1 fill-gold text-gold" size={28} strokeWidth={1.5} />
              <span className="text-[10px] font-medium">Watch Video Tour</span>
            </button>
          </figure>
        </div>
      </section>
      <section className="bg-card py-20">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <p className="text-xs font-semibold tracking-[0.24em] text-sage">A PRIVATE WAY OF LIFE</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-deep sm:text-4xl">
            Space for the moments that matter.
          </h2>
          <p className="mt-5 text-sm leading-7 text-deep/70">
            From quiet mornings with mountain views to evenings shared around the table, the villa
            is made for living well.
          </p>
          <Button asChild variant="dark" className="mt-8">
            <a href="/gallery">
              Explore the gallery <ArrowRight />
            </a>
          </Button>
        </div>
      </section>
    </VillaLayout>
  );
}
