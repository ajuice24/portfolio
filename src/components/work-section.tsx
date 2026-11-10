"use client";

import { ArrowUpRight, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { works, type Work } from "@/data/portfolio";

export function WorkSection() {
  const [slug, setSlug] = useState<string | null>(null);
  const hold = useRef(false);
  const active = works.find((work) => work.slug === slug) ?? null;

  useEffect(() => {
    const read = () => {
      if (hold.current) return;
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

  function open(next: string) {
    const url = `${window.location.pathname}${window.location.search}#${next}`;
    hold.current = true;
    if (window.location.hash !== `#${next}`) history.pushState(null, "", url);
    setSlug(next);
    queueMicrotask(() => {
      hold.current = false;
    });
  }

  function close() {
    hold.current = true;
    if (works.some((work) => `#${work.slug}` === window.location.hash)) {
      history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
    setSlug(null);
    queueMicrotask(() => {
      hold.current = false;
    });
  }

  return (
    <section id="work" className="scroll-mt-6 mx-auto w-full max-w-6xl py-20 pr-6 pl-[4.75rem] md:py-28 md:pr-10 md:pl-24">
      <h2 className="font-display text-4xl tracking-tight md:text-5xl">Selected work</h2>
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {works.map((work) => (
          <li key={work.slug} className="h-full">
            <button
              type="button"
              aria-label={`Open ${work.title}`}
              className="flex h-full w-full cursor-pointer flex-col border border-foreground/20 bg-card p-6 text-left transition-colors duration-150 hover:border-foreground motion-reduce:transition-none"
              onClick={() => open(work.slug)}
            >
              {work.image ? (
                <span className="relative mb-6 block aspect-[16/9] overflow-hidden bg-muted">
                  <Image src={work.image} alt="" fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
                </span>
              ) : null}
              <span className="font-display text-3xl leading-tight tracking-tight">{work.title}</span>
              <span className="mt-3 leading-relaxed text-muted-foreground">{work.summary}</span>
              <span className="mt-6 text-sm text-foreground">{work.context}</span>
              <span className="mt-1 text-sm text-muted-foreground">{work.period}</span>
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

function ProjectDetail({ work, onClose }: { work: Work; onClose: () => void }) {
  const reduce = useReducedMotion();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const enter = reduce ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };
  const exit = reduce ? { duration: 0 } : { duration: 0.2, ease: [0.4, 0, 1, 1] as const };

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
      const nodes = [...panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
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
      exit={{ opacity: 0, transition: exit }}
      transition={enter}
    >
      <button
        type="button"
        aria-label="Close project"
        className="absolute inset-0 cursor-pointer bg-foreground/50"
        onClick={onClose}
      />
      <div className="pointer-events-none relative flex h-full items-end justify-center md:items-center md:p-6">
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="pointer-events-auto max-h-[100dvh] w-full overflow-y-auto overscroll-contain border border-foreground/20 bg-card md:max-h-[min(92dvh,760px)] md:max-w-3xl"
          initial={reduce ? false : { y: 20 }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: 12, transition: exit }}
          transition={enter}
        >
          {work.image ? (
            <div className="relative aspect-[16/9] bg-muted">
              <Image src={work.image} alt="" fill sizes="(min-width: 768px) 760px, 100vw" className="object-cover" />
            </div>
          ) : null}
          <div className="p-6 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <p className="pt-3 text-sm text-muted-foreground">{work.context}</p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="inline-flex size-11 cursor-pointer items-center justify-center border border-border transition-colors duration-150 hover:bg-muted"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <h2 id={titleId} className="mt-6 font-display text-4xl tracking-tight text-balance">
              {work.title}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">{work.period}</p>
            <p className="mt-6 text-lg leading-relaxed">{work.summary}</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">{work.detail}</p>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{work.stack.join(" · ")}</p>
            {work.href ? (
              <a
                href={work.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 text-sm text-accent underline decoration-accent underline-offset-4"
              >
                Visit project
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
