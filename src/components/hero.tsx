"use client";

import { ArrowDown } from "@phosphor-icons/react";
import { useRef } from "react";
import { profile } from "@/data/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-line", {
          y: 18,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        });
        gsap.from(".hero-rule", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.8,
          delay: 0.28,
          ease: "power2.out",
        });
      });
      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="scroll-mt-6 mx-auto w-full max-w-6xl px-6 pt-10 pb-8 md:px-10 md:pt-16">
      <p className="hero-line text-xs tracking-[0.22em] text-muted-foreground uppercase">
        01 — Portfolio
      </p>
      <div className="mt-8 grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.9] font-medium tracking-[-0.04em]">
            <span className="hero-line block">Mohamed</span>
            <span className="hero-line block">Ajmal Ahmed</span>
          </h1>
          <div className="hero-rule mt-8 h-px w-24 origin-left bg-foreground" />
          <p className="hero-line mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {profile.summary}
          </p>
          <p className="hero-line mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {profile.earlier}
          </p>
          <div className="hero-line mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="#work"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 bg-foreground px-5 text-sm text-background hover:bg-zinc-800"
            >
              Selected work
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              Email
            </a>
          </div>
        </div>
        <aside className="hero-line border-t border-border pt-6 lg:col-span-4 lg:border-t-0 lg:pt-2">
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Now</p>
          <p className="mt-4 font-display text-2xl tracking-tight">{profile.now.org}</p>
          <p className="mt-1 text-sm">{profile.now.title}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{profile.now.note}</p>
          <p className="mt-4 text-sm text-muted-foreground">{profile.now.place}</p>
        </aside>
      </div>
    </section>
  );
}
