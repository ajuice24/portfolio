"use client";

import { Briefcase, Code, GraduationCap, House, Medal, Path } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "#top", id: "top", label: "Home", icon: House },
  { href: "#path", id: "path", label: "Path", icon: Path },
  { href: "#work", id: "work", label: "Work", icon: Briefcase },
  { href: "#education", id: "education", label: "Education", icon: GraduationCap },
  { href: "#skills", id: "skills", label: "Skills", icon: Code },
  { href: "#awards", id: "awards", label: "Awards", icon: Medal },
];

const STEP = 48;

export function SiteHeader() {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState("top");
  const pinned = useRef<string | null>(null);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null);
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (pinned.current) {
          const target = document.getElementById(pinned.current);
          const top = target?.getBoundingClientRect().top ?? 999;
          if (Math.abs(top) > 96) return;
          pinned.current = null;
        }
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const active = [...links].reverse().find((link) => visible.has(link.id));
        setCurrent(active?.id ?? "top");
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function choose(id: string) {
    pinned.current = id;
    setCurrent(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
    const next = `${window.location.pathname}${window.location.search}#${id}`;
    if (window.location.hash !== `#${id}`) {
      history.pushState(null, "", next);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  }

  const index = Math.max(0, links.findIndex((link) => link.id === current));

  return (
    <header className="pointer-events-none fixed inset-y-0 left-3 z-30 flex items-center md:left-5">
      <nav
        aria-label="Sections"
        className="pointer-events-auto relative flex flex-col gap-1 rounded-full border border-foreground/15 bg-background p-1.5"
      >
        <motion.span
          aria-hidden="true"
          className="absolute top-1.5 left-1.5 size-11 rounded-full bg-accent"
          initial={false}
          animate={{ y: index * STEP }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
        />
        {links.map((link) => {
          const active = current === link.id;
          const Icon = link.icon;
          return (
            <a
              key={link.id}
              href={link.href}
              aria-current={active ? "location" : undefined}
              onClick={(event) => {
                event.preventDefault();
                choose(link.id);
              }}
              className={`relative z-10 inline-flex size-11 cursor-pointer items-center justify-center rounded-full ${
                active ? "text-background" : "text-foreground hover:text-accent"
              }`}
            >
              <Icon size={20} weight="regular" aria-hidden="true" />
              <span className="sr-only">{link.label}</span>
            </a>
          );
        })}
      </nav>
    </header>
  );
}
