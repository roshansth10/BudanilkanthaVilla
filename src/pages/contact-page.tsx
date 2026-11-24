import { useState, type FormEvent } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, type FormEvent } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VillaLayout } from "@/components/villa-layout";

export function ContactPage() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }
  const fieldClass =
    "min-h-11 rounded-sm border border-cream/20 bg-deep/15 px-3 text-sm text-cream outline-none placeholder:text-cream/45 focus:border-gold";
  return (
    <VillaLayout>
      <section className="bg-deep py-20 text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[2fr_3fr] lg:items-start lg:px-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-gold">CONTACT</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Come see it for yourself.
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-cream/65">
              We would love to show you around. Fill out the form and we will get back to you to
              arrange a private visit.
            </p>
            <div className="mt-10 space-y-4 border-t border-cream/15 pt-6 text-sm text-cream/70">
              <p>Budhanilkantha, Kathmandu, Nepal</p>
              <p>Available for private viewings by appointment</p>
            </div>
          </div>
          <div className="rounded-md bg-sage p-6 sm:p-9">
            <p className="text-xs font-semibold tracking-[0.24em] text-gold">
              BOOK A PRIVATE VISIT
            </p>
            <form onSubmit={submit} className="mt-7 grid gap-3 sm:grid-cols-2">
              <label className="sr-only" htmlFor="name">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Your Name"
                className={fieldClass}
              />
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
              <input
                id="date"
                name="date"
                type="date"
                required
                className={`${fieldClass} scheme-dark`}
              />
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
                <Sparkles className="text-gold" size={18} /> Thank you. Your private visit request
                has been received.
              </div>
            )}
          </div>
        </div>
      </section>
    </VillaLayout>
  );
}
