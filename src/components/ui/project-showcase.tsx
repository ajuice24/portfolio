"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ShowcaseProject = {
  title: string;
  description: string;
  year: string;
  href: string;
  image: string;
};

const PREVIEW_WIDTH = 380;
const PREVIEW_HEIGHT = 228;

export function ProjectShowcase({ projects }: { projects: ShowcaseProject[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isVisible) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const tick = () => {
      const preview = previewRef.current;
      const box = containerRef.current;
      if (preview && box) {
        const factor = reduce ? 1 : 0.15;
        smooth.current.x += (target.current.x - smooth.current.x) * factor;
        smooth.current.y += (target.current.y - smooth.current.y) * factor;

        writePosition(smooth.current.x, smooth.current.y);
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isVisible]);

  function writePosition(_x: number, y: number) {
    const preview = previewRef.current;
    const box = containerRef.current;
    if (!preview || !box) return;
    const rect = box.getBoundingClientRect();
    const heading = box.querySelector("h2");
    const list = box.querySelector("[data-work-list]");
    const headingLimit = heading ? heading.offsetTop + heading.offsetHeight + 16 : 8;
    const viewTop = Math.max(headingLimit, -rect.top + 16);
    const viewBottom = Math.min(box.clientHeight - 8, window.innerHeight - rect.top - 16);
    const maxTop = Math.max(viewTop, viewBottom - PREVIEW_HEIGHT);
    const top = Math.min(Math.max(viewTop, y - PREVIEW_HEIGHT / 2), maxTop);
    const besideList = list ? list.offsetLeft + list.offsetWidth + 32 : 8;
    const left = Math.min(Math.max(8, besideList), Math.max(8, box.clientWidth - PREVIEW_WIDTH - 8));
    preview.style.transform = `translate3d(${left}px, ${top}px, 0)`;
  }

  function pointFromEvent(clientX: number, clientY: number) {
    const box = containerRef.current?.getBoundingClientRect();
    if (!box) return;
    target.current.x = clientX - box.left;
    target.current.y = clientY - box.top;
  }

  function showAt(index: number, clientX: number, clientY: number) {
    pointFromEvent(clientX, clientY);
    smooth.current.x = target.current.x;
    smooth.current.y = target.current.y;
    writePosition(smooth.current.x, smooth.current.y);
    setHoveredIndex(index);
    setIsVisible(true);
  }

  function showOnRow(index: number, row: HTMLElement) {
    const box = containerRef.current?.getBoundingClientRect();
    if (!box) return;
    const rect = row.getBoundingClientRect();
    showAt(index, rect.left + Math.min(rect.width * 0.62, 280), rect.top + rect.height * 0.45);
  }

  return (
    <section
      id="work"
      ref={containerRef}
      onMouseMove={(event) => pointFromEvent(event.clientX, event.clientY)}
      className="relative mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-24"
    >
      <h2 className="font-hero text-4xl font-black leading-[0.92] tracking-[-0.045em] text-foreground md:text-6xl">
        My Works
      </h2>

      <div
        ref={previewRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 left-0 z-40 hidden w-[380px] overflow-hidden rounded-xl border border-border bg-muted shadow-[0_22px_50px_var(--sticker-shadow)] [@media(pointer:fine)]:block",
          isVisible ? "opacity-100" : "opacity-0",
        )}
        style={{
          height: PREVIEW_HEIGHT,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative size-full">
          {projects.map((project, index) => (
            <Image
              key={project.title}
              src={project.image}
              alt=""
              fill
              sizes="380px"
              className={cn(
                "object-cover motion-reduce:transition-none",
                hoveredIndex === index ? "opacity-100" : "opacity-0",
              )}
              style={{
                transition: "opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          ))}
        </div>
      </div>

      <div
        data-work-list
        className="mt-10 max-w-3xl md:mt-14 [@media(pointer:fine)_and_(min-width:960px)]:max-w-[calc(100%-25.5rem)]"
      >
        {projects.map((project, index) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block cursor-pointer rounded-lg outline-offset-4"
            onMouseEnter={(event) => showAt(index, event.clientX, event.clientY)}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setIsVisible(false);
            }}
            onFocus={(event) => showOnRow(index, event.currentTarget)}
            onBlur={() => {
              setHoveredIndex(null);
              setIsVisible(false);
            }}
          >
            <div className="relative border-t border-foreground/15 py-6 md:py-7">
              <div
                className={cn(
                  "absolute inset-0 -mx-4 rounded-lg bg-muted/80 px-4 transition-opacity duration-300 ease-out motion-reduce:transition-none",
                  hoveredIndex === index ? "opacity-100" : "opacity-0",
                )}
              />

              <div className="relative">
                <div className="relative mb-4 hidden aspect-[380/228] overflow-hidden rounded-xl border border-border bg-muted [@media(pointer:coarse)]:block">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="inline-flex items-center gap-2">
                      <h3 className="font-hero text-[1.65rem] font-black leading-[1.05] tracking-[-0.045em] text-foreground md:text-3xl">
                        <span className="relative">
                          {project.title}
                          <span
                            className={cn(
                              "absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-300 ease-out motion-reduce:transition-none",
                              hoveredIndex === index ? "w-full" : "w-0",
                            )}
                          />
                        </span>
                      </h3>
                      <ArrowUpRight
                        aria-hidden="true"
                        className={cn(
                          "size-5 text-muted-foreground transition-all duration-300 ease-out motion-reduce:transition-none",
                          hoveredIndex === index
                            ? "translate-x-0 translate-y-0 opacity-100"
                            : "-translate-x-2 translate-y-2 opacity-0",
                        )}
                      />
                    </div>
                    <p
                      className={cn(
                        "mt-2 max-w-xl font-script text-xl leading-snug transition-colors duration-300 ease-out motion-reduce:transition-none md:text-2xl",
                        hoveredIndex === index ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {project.description}
                    </p>
                    <span className="sr-only">Opens in a new tab</span>
                  </div>
                  <span
                    className={cn(
                      "pt-1 font-hero text-sm font-black tracking-[-0.045em] tabular-nums transition-colors duration-300 ease-out motion-reduce:transition-none",
                      hoveredIndex === index ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {project.year}
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
        <div className="border-t border-foreground/15" />
      </div>
    </section>
  );
}
