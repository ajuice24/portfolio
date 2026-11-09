"use client";

import { Certificate, Medal } from "@phosphor-icons/react";
import { useRef } from "react";
import { awards } from "@/data/portfolio";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const icons = {
  medal: Medal,
  certificate: Certificate,
};

export function Awards() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".award-card", {
          opacity: 0,
          y: 12,
          duration: 0.4,
          stagger: 0.06,
          ease: "power1.out",
          scrollTrigger: { trigger: root.current, start: "top 85%" },
        });
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
      });
      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="awards" className="scroll-mt-6 border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-28">
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">05 — Awards</p>
        <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">Recognition</h2>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {awards.map((award) => {
            const Icon = icons[award.icon];
            return (
              <li key={award.title} className="award-card flex min-h-56 flex-col border border-border bg-card p-6">
                <span className="inline-flex size-11 items-center justify-center border border-border">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <p className="mt-6 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                  {award.mark} · {award.year}
                </p>
                <h3 className="mt-3 font-display text-2xl tracking-tight">{award.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{award.detail}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
