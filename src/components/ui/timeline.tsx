"use client";

import {
  type CSSProperties,
  useRef,
  useSyncExternalStore,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
} as const;

type Month = keyof typeof monthOrder;

export type TimelineItem = {
  id: string;
  year: string;
  month: Month;
  /** Heavy display line, set like the hero title. */
  heading: string;
  content: string;
  logo?: {
    src: string;
    alt: string;
    /** File width divided by file height. */
    aspect: number;
    /** Visible mark as fractions of the file. Transparent padding is cropped out. */
    view?: { x: number; y: number; w: number; h: number };
  };
};

type SplitTextInstance = InstanceType<typeof SplitText>;

export type TimelineProps = {
  id?: string;
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Reveal animation duration, in seconds. */
  duration?: number;
  /** Fallback reveal duration when `duration` is omitted, in seconds. */
  scrollDuration?: number;
  topItems: TimelineItem[];
  bottomItems: TimelineItem[];
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);

  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;

  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

function revealPositions(count: number, mobile: boolean) {
  if (!mobile && count === 7) {
    return [
      [6, 26],
      [16, 36],
      [26, 46],
      [35, 55],
      [45, 65],
      [55, 75],
      [65, 85],
    ] as const;
  }
  if (mobile && count === 7) {
    return [
      [22, 32],
      [28, 38],
      [36, 46],
      [45, 55],
      [52, 62],
      [60, 70],
      [69, 79],
    ] as const;
  }

  const start = mobile ? 22 : 6;
  const span = mobile ? 12 : 20;
  const step = mobile ? 8 : 10;
  return Array.from({ length: count }, (_, index) => [
    start + index * step,
    start + index * step + span,
  ]);
}

function HeadingText({ heading }: { heading: string }) {
  const dash = heading.indexOf(" — ");
  if (dash === -1) return heading;

  const lead = heading.slice(0, dash);
  const role = heading.slice(dash + 3);
  const wordBreak = role.indexOf(" ");
  const firstWord = wordBreak === -1 ? role : role.slice(0, wordBreak);
  const rest = wordBreak === -1 ? "" : role.slice(wordBreak + 1);

  return (
    <>
      <span className="whitespace-nowrap">
        {lead}
        {" — "}
        {firstWord}
      </span>
      {rest ? ` ${rest}` : null}
    </>
  );
}

export default function Timeline({
  id = "path",
  title = "My path",
  periodLabel = "2021 — Now",
  textColor = "#1c3d32",
  mutedTextColor = "#345c4c",
  activeColor = "#8a7d6c",
  backgroundColor = "#f3eadf",
  imageUrl = "/assets/photo_2026-11-15_02-04-59.jpg",
  imageAlt = "Portrait of Mohamed Ajmal Ahmed",
  duration,
  scrollDuration = 1.2,
  topItems,
  bottomItems,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const animationDuration = duration ?? scrollDuration;
  const normalizedDuration = Math.max(0.2, animationDuration);
  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };
  const items = [...topItems, ...bottomItems].sort((a, b) => {
    const yearDiff = Number(a.year) - Number(b.year);
    if (yearDiff !== 0) return yearDiff;
    return monthOrder[a.month] - monthOrder[b.month];
  });

  useGSAP(() => {
    const section = sectionRef.current;

    if (!section) return;

    const isMobile = window.innerWidth < 600;
    const slidePercent = isMobile ? -62 : -72;
    const lineWidth = isMobile ? "65%" : "98%";
    const lineStart = isMobile ? "top 30%" : "top 25%";
    const slideEnd = isMobile ? "82% 50%" : "92% bottom";
    const lineEnd = isMobile ? "80% 50%" : "92% bottom";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: slideEnd,
        scrub: true,
      },
      defaults: {
        ease: "none",
      },
    });

    tl.fromTo(
      wholeSliderRef.current,
      { xPercent: 0 },
      { xPercent: slidePercent },
    );

    if (reducedMotion) {
      gsap.set(".journey-line", { width: lineWidth });
      return;
    }

    gsap.to(".journey-line", {
      width: lineWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: lineStart,
        end: lineEnd,
        scrub: true,
      },
    });
  }, { dependencies: [reducedMotion], scope: sectionRef, revertOnUpdate: true });

  useGSAP(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (reducedMotion) {
      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.copy-${item.id}`, { autoAlpha: 1 });
        gsap.set(`.title-${item.id}`, { opacity: 1, clearProps: "transform" });
        gsap.set(`.description-${item.id}`, {
          opacity: 1,
          clearProps: "transform",
        });
      });
      return;
    }

    const copies: Record<string, HTMLElement | null> = {};

    items.forEach((item) => {
      const copy = section.querySelector<HTMLElement>(`.copy-${item.id}`);
      copies[item.id] = copy;
      gsap.set(`.jl-${item.id}`, {
        scaleY: 0,
        transformOrigin: "bottom bottom",
      });
      gsap.set(`.jd-${item.id}`, { scale: 0 });
      if (copy) gsap.set(copy, { autoAlpha: 0 });
    });

    const titleSplits: Partial<Record<string, SplitTextInstance>> = {};
    const descriptionSplits: Partial<Record<string, SplitTextInstance>> = {};

    items.forEach((item) => {
      titleSplits[item.id] = new SplitText(`.title-${item.id}`, {
        type: "chars, words, lines",
        mask: "lines",
      });

      descriptionSplits[item.id] = new SplitText(`.description-${item.id}`, {
        type: "chars, words, lines",
        mask: "lines",
      });
    });

    const createItemTimeline = (
      item: TimelineItem,
      startPos: number,
      endPos: number,
    ) => {
      const lineSelector = `.jl-${item.id}`;
      const dotSelector = `.jd-${item.id}`;
      const titleLines = titleSplits[item.id]?.lines || [];
      const descriptionLines = descriptionSplits[item.id]?.lines || [];
      const isTop = topItems.some((topItem) => topItem.id === item.id);

      if (!isTop) {
        gsap.set(lineSelector, { transformOrigin: "top top" });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `${startPos}% 30%`,
          end: `${endPos}% 50%`,
          scrub: true,
        },
      });

      const stem = normalizedDuration * 0.45;
      const reveal = normalizedDuration * 0.7;

      timeline
        .to(lineSelector, {
          scaleY: 1,
          duration: stem,
          ease: "none",
        })
        .to(dotSelector, {
          scale: 1,
          duration: stem * 0.35,
          ease: "power2.out",
        })
        .fromTo(
          copies[item.id],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: reveal * 0.4, ease: "power2.out" },
        )
        .fromTo(
          titleLines,
          { y: 100 },
          {
            y: 0,
            duration: reveal,
            stagger: 0.02,
            ease: "power2.out",
          },
          "<",
        )
        .fromTo(
          descriptionLines,
          { y: 100 },
          {
            y: 0,
            duration: reveal,
            stagger: 0.02,
            ease: "power2.out",
          },
          "<",
        );

      return timeline;
    };

    const positions = revealPositions(items.length, window.innerWidth < 600);

    items.forEach((item, index) => {
      const pair = positions[index];
      if (!pair) return;
      createItemTimeline(item, pair[0], pair[1]);
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      Object.values(titleSplits).forEach((split) => split?.revert?.());
      Object.values(descriptionSplits).forEach((split) => split?.revert?.());
      window.removeEventListener("resize", handleResize);
    };
  }, {
    dependencies: [normalizedDuration, reducedMotion, topItems, bottomItems],
    scope: sectionRef,
    revertOnUpdate: true,
  });

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label={title}
      className="relative h-[200vw] w-full max-[600px]:h-[400vh]"
      style={sectionStyle}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden pt-[calc(10%+30px)] max-[600px]:top-[5%]">
        <div
          ref={wholeSliderRef}
          className="mr-[2vw] flex h-[min(46vw,64vh)] w-[280vw] shrink-0 items-center gap-[11vw] px-[5vw] max-[600px]:h-[80vh] max-[600px]:w-[860vw] max-[600px]:gap-[12vw] max-[600px]:px-[7vw]"
        >
          <div className="h-full w-[28vw] shrink-0 overflow-hidden rounded-[1vw] max-[600px]:h-[65vw] max-[600px]:w-[78vw] max-[600px]:rounded-[5vw]">
            <img
              src={imageUrl}
              alt={imageAlt}
              draggable={false}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="relative h-full w-full">
            <div className="absolute top-1/2 left-0 flex h-fit w-full -translate-y-1/2 items-center">
              <div
                className="h-[.8vw] w-[.8vw] rounded-full max-[600px]:h-[2vw] max-[600px]:w-[2vw]"
                style={activeStyle}
              />
              <div
                className="journey-line h-px w-[0%] rounded-full"
                style={activeStyle}
              />
              <div
                className="h-[.8vw] w-[.8vw] rounded-full max-[600px]:h-[2vw] max-[600px]:w-[2vw]"
                style={activeStyle}
              />
            </div>

            <div className="flex h-1/2 w-full items-center justify-start gap-[.5vw]">
              <div className="h-full w-[14vw] shrink-0 pt-[2vw] max-[600px]:h-fit max-[600px]:w-[30vw] max-[600px]:pt-[5vw]">
                <h2 className="w-[65%] font-hero text-[3vw] font-black leading-[1.05] tracking-[-0.045em] max-[600px]:text-[8.5vw]">
                  {title}
                </h2>
              </div>

              <div className="flex h-full w-full gap-x-[18vw] pl-[6vw] max-[600px]:gap-x-[48vw] max-[600px]:pl-[8vw]">
                {topItems.map((item) => (
                  <div
                    key={`top-${item.id}`}
                    className="relative h-full w-[34vw] shrink-0 px-[2vw] max-[600px]:flex max-[600px]:w-[78vw] max-[600px]:flex-col max-[600px]:px-[6vw]"
                  >
                    <div className="absolute top-0 left-0 h-full w-full">
                      <div
                        className={`jd-${item.id} relative aspect-square size-[1vw] translate-x-[-50%] rounded-full max-[600px]:size-[2.5vw]`}
                        style={activeStyle}
                      />
                      <div
                        className={`jl-${item.id} h-[94%] w-px origin-bottom rounded-full`}
                        style={activeStyle}
                      />
                    </div>

                    <div className={`copy-${item.id} space-y-[1.35vw] max-[600px]:space-y-[3vw]`}>
                      <div className="flex items-center gap-[1.25vw] max-[600px]:gap-[3vw]">
                        <MilestoneLogo item={item} />
                        <h4
                          className={`title-${item.id} flex-1 font-hero text-[1.7vw] font-black leading-[1.2] tracking-[-0.045em] max-[600px]:text-[4.6vw]`}
                        >
                          <HeadingText heading={item.heading} />
                        </h4>
                      </div>
                      <p
                        className={`description-${item.id} w-[95%] font-script text-[1.35vw] leading-[1.6] max-[600px]:text-[4.2vw]`}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex h-1/2 w-full items-center justify-start">
              <div className="h-full w-[14vw] shrink-0 pt-[2vw] max-[600px]:w-[30vw] max-[600px]:pt-[5vw]">
                <p
                  className="font-hero text-[1.65vw] font-black leading-none tracking-[-0.045em] max-[600px]:text-[4.2vw]"
                  style={mutedTextStyle}
                >
                  {periodLabel}
                </p>
              </div>

              <div className="ml-[28vw] flex h-full w-full gap-x-[18vw] max-[600px]:ml-[36vw] max-[600px]:gap-x-[48vw]">
                {bottomItems.map((item) => (
                  <div
                    key={`bottom-${item.id}`}
                    className="relative h-full w-[34vw] shrink-0 px-[2vw] max-[600px]:w-[78vw] max-[600px]:px-[6vw]"
                  >
                    <div className="absolute bottom-[-1%] left-0 h-full w-full">
                      <div
                        className={`jl-${item.id} h-[94%] w-px origin-top rounded-full max-[600px]:h-full`}
                        style={activeStyle}
                      />
                      <div
                        className={`jd-${item.id} relative aspect-square size-[1vw] w-auto translate-x-[-50%] rounded-full max-[600px]:size-[2.5vw]`}
                        style={activeStyle}
                      />
                    </div>

                    <div className={`copy-${item.id} flex h-full w-full flex-col justify-end space-y-[1.35vw] pb-[2.4vw] max-[600px]:space-y-[3vw] max-[600px]:pb-[6vw]`}>
                      <div className="flex items-center gap-[1.25vw] max-[600px]:gap-[3vw]">
                        <MilestoneLogo item={item} />
                        <h4
                          className={`title-${item.id} flex-1 font-hero text-[1.7vw] font-black leading-[1.2] tracking-[-0.045em] max-[600px]:text-[4.6vw]`}
                        >
                          <HeadingText heading={item.heading} />
                        </h4>
                      </div>
                      <p
                        className={`description-${item.id} w-[95%] font-script text-[1.35vw] leading-[1.6] max-[600px]:text-[4.2vw]`}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const logoHeight = "h-[3.4vw] max-[600px]:h-[9.6vw]";

function MilestoneLogo({ item }: { item: TimelineItem }) {
  const logo = item.logo;
  if (!logo) return null;

  const view = logo.view ?? { x: 0, y: 0, w: 1, h: 1 };
  const marksFullFrame =
    view.x === 0 && view.y === 0 && view.w === 1 && view.h === 1;

  if (marksFullFrame) {
    return (
      <img
        src={logo.src}
        alt={logo.alt}
        draggable={false}
        className={`${logoHeight} w-auto shrink-0 object-contain`}
      />
    );
  }

  return (
    <span
      className={`relative block shrink-0 overflow-hidden ${logoHeight}`}
      style={{ aspectRatio: `${view.w * logo.aspect} / ${view.h}` }}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        draggable={false}
        className="absolute h-auto max-w-none"
        style={{
          height: `${100 / view.h}%`,
          left: `${(-view.x / view.w) * 100}%`,
          top: `${(-view.y / view.h) * 100}%`,
        }}
      />
    </span>
  );
}
