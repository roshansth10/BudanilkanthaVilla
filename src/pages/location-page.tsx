import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { distances } from "@/components/villa-data";
import { VillaLayout } from "@/components/villa-layout";

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

export function LocationPage() {
  return (
    <VillaLayout>
      <section className="bg-deep py-20 text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-gold">LOCATION</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold">Budhanilkantha, Kathmandu</h1>
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
          <div className="flex flex-col justify-center border-t border-cream/15 pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <p className="text-xs font-semibold tracking-[0.24em] text-gold">
              COME CLOSER TO NATURE
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold">
              A calm address, close to everything.
            </h2>
            <p className="mt-4 text-sm leading-7 text-cream/65">
              Set in the green hills of Kathmandu, the villa gives you privacy and breathing room
              without leaving the city behind.
            </p>
            <Button asChild variant="gold" className="mt-8 w-fit">
              <a href="/contact">
                Plan a private visit <ArrowRight />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </VillaLayout>
  );
}
