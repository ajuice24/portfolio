"use client";

import { useRef } from "react";
import { skills } from "@/data/portfolio";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".skill-chip", {
          opacity: 0,
          y: 8,
          duration: 0.3,
          stagger: 0.03,
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
    <section ref={root} id="skills" className="scroll-mt-6 border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-28">
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">04 — Skills</p>
        <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">What I use</h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          The tools from recent product work, grouped so the list stays readable.
        </p>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {skills.map((group) => (
            <div key={group.label}>
              <h3 className="font-display text-2xl tracking-tight">{group.label}</h3>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={group.label}>
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="skill-chip inline-flex min-h-9 items-center border border-border bg-card px-3 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
