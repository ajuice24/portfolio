"use client";

import { ArrowUpRight, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { works, type Work } from "@/data/portfolio";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { WorkFrame } from "./work-frame";

export function WorkSection() {
  const root = useRef<HTMLElement>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const active = works.find((work) => work.slug === slug) ?? null;

  useEffect(() => {
    const read = () => {
      const id = window.location.hash.replace(/^#/, "");
      setSlug(works.some((work) => work.slug === id) ? id : null);
    };
    read();
    window.addEventListener("popstate", read);
    window.addEventListener("hashchange", read);
    return () => {
      window.removeEventListener("popstate", read);
      window.removeEventListener("hashchange", read);
    };
  }, []);

  useGSAP(
    () => {
      const motionMedia = gsap.matchMedia();
      motionMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".work-card", { opacity: 0, y: 16 });
        ScrollTrigger.batch(".work-card", {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              stagger: 0.06,
              duration: 0.4,
              ease: "power1.out",
              overwrite: true,
            });
          },
        });
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
      });
      return () => motionMedia.revert();
    },
    { scope: root },
  );

  function open(next: string) {
    const url = `${window.location.pathname}${window.location.search}#${next}`;
    if (window.location.hash !== `#${next}`) history.pushState(null, "", url);
    setSlug(next);
  }

  function close() {
    if (window.location.hash && works.some((work) => `#${work.slug}` === window.location.hash)) {
      history.pushState(null, "", `${window.location.pathname}${window.location.search}`);
    }
    setSlug(null);
  }

  return (
    <section ref={root} id="work" className="scroll-mt-6 mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-28">
      <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">02 — Work</p>
      <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 className="font-display text-4xl tracking-tight md:text-5xl">Selected work</h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Five projects. Photographs can drop in later — the frames are standing in until then.
        </p>
      </div>
      <ul className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {works.map((work, index) => (
          <li key={work.slug} className={index === 0 ? "md:col-span-2" : undefined}>
            <button
              type="button"
              className="work-card group w-full cursor-pointer text-left"
              onClick={() => open(work.slug)}
            >
              <WorkMedia
                work={work}
                aspect={index === 0 ? "aspect-[16/10] md:aspect-[2/1]" : "aspect-[16/10]"}
              />
              <span className="mt-4 flex items-start justify-between gap-4">
                <span>
                  <span className="block font-display text-2xl tracking-tight">{work.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{work.summary}</span>
                </span>
                <span className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm">
                  View
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </span>
              <span className="mt-2 block text-xs tracking-wide text-muted-foreground uppercase">
                {work.context} · {work.period}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence mode="wait">
        {active ? <ProjectDetail key={active.slug} work={active} onClose={close} /> : null}
      </AnimatePresence>
    </section>
  );
}

function WorkMedia({ work, aspect }: { work: Work; aspect: string }) {
  return (
    <span className={`relative block overflow-hidden bg-muted ${aspect}`}>
      <span className="absolute inset-0 block motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]">
        {work.image ? (
          <Image
            src={work.image}
            alt=""
            fill
            sizes={work.slug === "sahana" ? "(min-width: 768px) 1100px, 100vw" : "(min-width: 768px) 540px, 100vw"}
            className="object-cover"
          />
        ) : (
          <WorkFrame mark={work.mark} />
        )}
      </span>
      {!work.image ? (
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-3 text-[11px] tracking-[0.16em] text-muted-foreground uppercase"
        >
          Photo to come
        </span>
      ) : null}
    </span>
  );
}

function ProjectDetail({ work, onClose }: { work: Work; onClose: () => void }) {
  const reduce = useReducedMotion();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const transition = reduce
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  useEffect(() => {
    previouslyFocused.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = [
        ...panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ];
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
    >
      <div className="absolute inset-0 bg-[#09090b]/55" onClick={onClose} />
      <div className="pointer-events-none relative flex h-full items-end justify-center md:items-center md:p-6">
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="pointer-events-auto max-h-[100dvh] w-full overflow-y-auto overscroll-contain bg-card md:max-h-[min(92dvh,860px)] md:max-w-5xl"
          initial={reduce ? false : { y: 24 }}
          animate={{ y: 0 }}
          exit={reduce ? { opacity: 1 } : { y: 16 }}
          transition={transition}
        >
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-64 bg-muted md:min-h-[560px]">
              {work.image ? (
                <Image src={work.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              ) : (
                <>
                  <WorkFrame mark={work.mark} />
                  <p className="absolute bottom-4 left-4 text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                    Photo to come
                  </p>
                </>
              )}
            </div>
            <div className="flex flex-col p-6 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <p className="pt-3 text-xs tracking-[0.18em] text-muted-foreground uppercase">{work.context}</p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="inline-flex size-11 cursor-pointer items-center justify-center border border-border hover:bg-muted"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
              <h2 id={titleId} className="mt-6 font-display text-4xl tracking-tight">
                {work.title}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{work.period}</p>
              <p className="mt-6 text-lg leading-relaxed">{work.summary}</p>
              <p className="mt-3 leading-relaxed text-muted-foreground">{work.detail}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tools">
                {work.stack.map((item) => (
                  <li
                    key={item}
                    className="inline-flex min-h-9 items-center border border-border px-3 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              {work.href ? (
                <a
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 bg-foreground px-5 text-sm text-background hover:bg-zinc-800"
                >
                  Visit project
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
