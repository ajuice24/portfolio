"use client";

import { useRef } from "react";
import { education } from "@/data/portfolio";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function EducationTimeline() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".edu-rail", {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.8,
          ease: "power1.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
        gsap.from(".edu-item", {
          opacity: 0,
          y: 12,
          duration: 0.4,
          stagger: 0.08,
          ease: "power1.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
      });
      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="education"
      className="scroll-mt-6 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-28">
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">03 — Education</p>
        <h2 className="mt-4 max-w-xl font-display text-4xl tracking-tight md:text-5xl">
          From language to computer science
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Two steps, a few years apart. The degree is where the current work starts.
        </p>
        <ol className="relative mt-14 max-w-3xl">
          <div className="edu-rail absolute top-2 bottom-2 left-[7px] w-px origin-top bg-foreground/25" />
          {education.map((item, index) => {
            const latest = index === education.length - 1;
            return (
              <li key={item.title} className="edu-item relative pb-16 pl-12 last:pb-0">
                <span
                  className={`absolute top-1 left-0 size-4 rounded-full border border-foreground ${
                    latest ? "bg-foreground" : "bg-background"
                  }`}
                  aria-hidden="true"
                />
                <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{item.period}</p>
                <h3 className="mt-3 font-display text-3xl tracking-tight">{item.title}</h3>
                <p className="mt-2 text-base">{item.school}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.place}</p>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{item.note}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
