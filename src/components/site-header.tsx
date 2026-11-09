"use client";

import { Briefcase, Code, GraduationCap, House, Medal } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#top", id: "top", label: "Home", icon: House },
  { href: "#work", id: "work", label: "Work", icon: Briefcase },
  { href: "#education", id: "education", label: "Education", icon: GraduationCap },
  { href: "#skills", id: "skills", label: "Skills", icon: Code },
  { href: "#awards", id: "awards", label: "Awards", icon: Medal },
];

export function SiteHeader() {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState("top");

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null);
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
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

  return (
    <header className="pointer-events-none fixed inset-y-0 left-3 z-30 flex items-center md:left-5">
      <nav
        aria-label="Sections"
        className="pointer-events-auto flex flex-col gap-1 rounded-full border border-border bg-card p-1.5 shadow-[0_10px_30px_rgba(9,9,11,0.06)]"
      >
        {links.map((link) => {
          const active = current === link.id;
          const Icon = link.icon;
          return (
            <a
              key={link.id}
              href={link.href}
              aria-current={active ? "location" : undefined}
              className={`relative inline-flex size-11 cursor-pointer items-center justify-center rounded-full ${
                active ? "text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active ? (
                <motion.span
                  layoutId="section-indicator"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 34, mass: 0.7 }
                  }
                />
              ) : null}
              <Icon size={20} weight="regular" aria-hidden="true" className="relative z-10" />
              <span className="sr-only">{link.label}</span>
            </a>
          );
        })}
      </nav>
    </header>
  );
}
