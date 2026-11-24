import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { photos } from "@/components/villa-data";
import { VillaLayout } from "@/components/villa-layout";

export function GalleryPage() {
  return (
    <VillaLayout>
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.24em] text-sage">GALLERY</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-deep sm:text-5xl">
            A closer look at villa life
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-deep/65">
            Explore the spaces, details and views that make Budhanilkantha Villa feel like home.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, index) => (
              <figure
                key={photo.src}
                className="group relative aspect-[4/3] overflow-hidden rounded-sm"
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
          <div className="mt-10 text-center">
            <Button asChild variant="dark" size="lg">
              <a href="/contact">
                Book a private visit <ArrowRight />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </VillaLayout>
  );
}
