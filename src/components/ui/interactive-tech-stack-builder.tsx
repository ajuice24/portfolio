"use client";

import { skills } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimation,
  useMotionTemplate,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import {
  Boxes,
  Braces,
  Container,
  Database,
  Feather,
  Flame,
  Hexagon,
  Layers,
  Smartphone,
  User,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type BrickIcon = LucideIcon | ((props: { className?: string; size?: number | string }) => React.ReactElement);

function iconSize(size?: number | string) {
  if (typeof size === "number") return size;
  const parsed = Number(size);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 24;
}

const IconReact = ({ className, size }: { className?: string; size?: number | string }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height={iconSize(size)} width={iconSize(size)} className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
  </svg>
);

const IconNext = ({ className, size }: { className?: string; size?: number | string }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height={iconSize(size)} width={iconSize(size)} className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
  </svg>
);

const STUD_THEMES = {
  green: {
    wall: "linear-gradient(90deg, #3f6212 0%, #4d7c0f 20%, #65a30d 38%, #84cc16 50%, #65a30d 62%, #4d7c0f 80%, #3f6212 100%)",
    cap: "linear-gradient(135deg, #d9f99d 0%, #a3e635 40%, #65a30d 70%, #4d7c0f 100%)",
    shadow: "radial-gradient(ellipse, rgba(20,40,0,0.55) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.75)",
  },
  dark: {
    wall: "linear-gradient(90deg, #09090b 0%, #18181b 20%, #27272a 38%, #3f3f46 50%, #27272a 62%, #18181b 80%, #09090b 100%)",
    cap: "linear-gradient(135deg, #52525b 0%, #3f3f46 40%, #27272a 70%, #18181b 100%)",
    shadow: "radial-gradient(ellipse, rgba(0,0,0,0.8) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.2)",
  },
  yellow: {
    wall: "linear-gradient(90deg, #a16207 0%, #ca8a04 20%, #eab308 38%, #facc15 50%, #eab308 62%, #ca8a04 80%, #a16207 100%)",
    cap: "linear-gradient(135deg, #fef08a 0%, #fde047 40%, #eab308 70%, #ca8a04 100%)",
    shadow: "radial-gradient(ellipse, rgba(80,50,0,0.6) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.7)",
  },
  blue: {
    wall: "linear-gradient(90deg, #1d4ed8 0%, #2563eb 20%, #3b82f6 38%, #60a5fa 50%, #3b82f6 62%, #2563eb 80%, #1d4ed8 100%)",
    cap: "linear-gradient(135deg, #bfdbfe 0%, #60a5fa 40%, #3b82f6 70%, #2563eb 100%)",
    shadow: "radial-gradient(ellipse, rgba(0,0,80,0.55) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.75)",
  },
  red: {
    wall: "linear-gradient(90deg, #9a3412 0%, #c2410c 20%, #ea580c 38%, #f97316 50%, #ea580c 62%, #c2410c 80%, #9a3412 100%)",
    cap: "linear-gradient(135deg, #fed7aa 0%, #fb923c 40%, #f97316 70%, #ea580c 100%)",
    shadow: "radial-gradient(ellipse, rgba(80,20,0,0.55) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.7)",
  },
  cyan: {
    wall: "linear-gradient(90deg, #0e7490 0%, #0891b2 20%, #06b6d4 38%, #22d3ee 50%, #06b6d4 62%, #0891b2 80%, #0e7490 100%)",
    cap: "linear-gradient(135deg, #a5f3fc 0%, #67e8f9 40%, #22d3ee 70%, #0891b2 100%)",
    shadow: "radial-gradient(ellipse, rgba(0,40,50,0.55) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.75)",
  },
  cobalt: {
    wall: "linear-gradient(90deg, #1e3a8a 0%, #1d4ed8 20%, #2563eb 38%, #3b82f6 50%, #2563eb 62%, #1d4ed8 80%, #1e3a8a 100%)",
    cap: "linear-gradient(135deg, #bfdbfe 0%, #60a5fa 40%, #2563eb 70%, #1d4ed8 100%)",
    shadow: "radial-gradient(ellipse, rgba(0,0,60,0.55) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.7)",
  },
  teal: {
    wall: "linear-gradient(90deg, #115e59 0%, #0f766e 20%, #0d9488 38%, #14b8a6 50%, #0d9488 62%, #0f766e 80%, #115e59 100%)",
    cap: "linear-gradient(135deg, #99f6e4 0%, #2dd4bf 40%, #0d9488 70%, #0f766e 100%)",
    shadow: "radial-gradient(ellipse, rgba(0,40,30,0.55) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.7)",
  },
  indigo: {
    wall: "linear-gradient(90deg, #312e81 0%, #4338ca 20%, #4f46e5 38%, #6366f1 50%, #4f46e5 62%, #4338ca 80%, #312e81 100%)",
    cap: "linear-gradient(135deg, #c7d2fe 0%, #818cf8 40%, #4f46e5 70%, #4338ca 100%)",
    shadow: "radial-gradient(ellipse, rgba(20,0,60,0.55) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.7)",
  },
  orange: {
    wall: "linear-gradient(90deg, #9a3412 0%, #c2410c 20%, #ea580c 38%, #fb923c 50%, #ea580c 62%, #c2410c 80%, #9a3412 100%)",
    cap: "linear-gradient(135deg, #ffedd5 0%, #fdba74 40%, #f97316 70%, #ea580c 100%)",
    shadow: "radial-gradient(ellipse, rgba(80,30,0,0.5) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.75)",
  },
  rose: {
    wall: "linear-gradient(90deg, #881337 0%, #be123c 20%, #e11d48 38%, #fb7185 50%, #e11d48 62%, #be123c 80%, #881337 100%)",
    cap: "linear-gradient(135deg, #fecdd3 0%, #fb7185 40%, #e11d48 70%, #be123c 100%)",
    shadow: "radial-gradient(ellipse, rgba(80,0,20,0.55) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.7)",
  },
  navy: {
    wall: "linear-gradient(90deg, #16324a 0%, #1e4d6b 20%, #336791 38%, #4c7ea8 50%, #336791 62%, #1e4d6b 80%, #16324a 100%)",
    cap: "linear-gradient(135deg, #bfdbfe 0%, #7da3c4 40%, #336791 70%, #1e4d6b 100%)",
    shadow: "radial-gradient(ellipse, rgba(0,20,40,0.6) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.65)",
  },
  sand: {
    wall: "linear-gradient(90deg, #8f6230 0%, #b7833e 20%, #d4a054 38%, #e8b86d 50%, #d4a054 62%, #b7833e 80%, #8f6230 100%)",
    cap: "linear-gradient(135deg, #fff3d6 0%, #f6d7a7 40%, #e8b86d 70%, #d4a054 100%)",
    shadow: "radial-gradient(ellipse, rgba(80,40,0,0.45) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.85)",
  },
  white: {
    wall: "linear-gradient(90deg, #a1a1aa 0%, #d4d4d8 20%, #e4e4e7 38%, #fafafa 50%, #e4e4e7 62%, #d4d4d8 80%, #a1a1aa 100%)",
    cap: "linear-gradient(135deg, #ffffff 0%, #f4f4f5 40%, #e4e4e7 70%, #d4d4d8 100%)",
    shadow: "radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%)",
    rim: "rgba(255,255,255,0.95)",
  },
};

type StudColor = keyof typeof STUD_THEMES;

const COLS = 6;
const BASE_STUD = 65;
const BASE_ROW = 80;
const BASE_APEX = 150;

type BrickColors = {
  topColor: string;
  faceGradient: string;
  bottomColor: string;
  studColor: StudColor;
  text: string;
  subtext: string;
  iconBg: string;
  iconColor: string;
  shine: string;
};

function tone(
  top: string,
  face: [string, string, string],
  bottom: string,
  studColor: StudColor,
  light = false,
): BrickColors {
  return {
    topColor: top,
    faceGradient: `linear-gradient(180deg, ${face[0]} 0%, ${face[1]} 50%, ${face[2]} 100%)`,
    bottomColor: bottom,
    studColor,
    text: light ? "text-zinc-900" : "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]",
    subtext: light ? "text-zinc-700" : "text-white/80",
    iconBg: light ? "bg-black/10 shadow-inner" : "bg-black/20 shadow-inner",
    iconColor: light ? "text-zinc-900" : "text-white",
    shine: light ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.28)",
  };
}

export type StackModule = {
  id: string;
  name: string;
  desc: string;
  group: string;
  icon: BrickIcon;
  studs: number;
  colors: BrickColors;
};

const CATALOG: Record<string, Omit<StackModule, "id" | "name" | "group">> = {
  React: {
    desc: "Interfaces",
    icon: IconReact,
    studs: 4,
    colors: tone("#a5f3fc", ["#67e8f9", "#22d3ee", "#0891b2"], "#0e7490", "cyan"),
  },
  "Next.js": {
    desc: "App framework",
    icon: IconNext,
    studs: 2,
    colors: tone("#52525b", ["#3f3f46", "#27272a", "#18181b"], "#09090b", "dark"),
  },
  TypeScript: {
    desc: "Typed JavaScript",
    icon: Braces,
    studs: 3,
    colors: tone("#93c5fd", ["#60a5fa", "#2563eb", "#1d4ed8"], "#1e3a8a", "cobalt"),
  },
  "Tailwind CSS": {
    desc: "Styling",
    icon: Wind,
    studs: 4,
    colors: tone("#5eead4", ["#2dd4bf", "#0d9488", "#0f766e"], "#115e59", "teal"),
  },
  "React Native": {
    desc: "iOS and Android",
    icon: Smartphone,
    studs: 4,
    colors: tone("#d9f99d", ["#a3e635", "#65a30d", "#4d7c0f"], "#3f6212", "green"),
  },
  Expo: {
    desc: "Native builds",
    icon: Hexagon,
    studs: 2,
    colors: tone("#fafafa", ["#f4f4f5", "#e4e4e7", "#d4d4d8"], "#a1a1aa", "white", true),
  },
  "Payload CMS": {
    desc: "Content editing",
    icon: Boxes,
    studs: 4,
    colors: tone("#f6d7a7", ["#e8b86d", "#d4a054", "#b7833e"], "#8f6230", "sand", true),
  },
  Strapi: {
    desc: "Headless CMS",
    icon: Layers,
    studs: 2,
    colors: tone("#a5b4fc", ["#818cf8", "#4f46e5", "#4338ca"], "#312e81", "indigo"),
  },
  "TanStack Start": {
    desc: "Full-stack React",
    icon: Hexagon,
    studs: 4,
    colors: tone("#fdba74", ["#fb923c", "#f97316", "#ea580c"], "#9a3412", "orange"),
  },
  Hono: {
    desc: "HTTP server",
    icon: Flame,
    studs: 2,
    colors: tone("#fca5a5", ["#f87171", "#ef4444", "#dc2626"], "#991b1b", "red"),
  },
  Laravel: {
    desc: "PHP backend",
    icon: Feather,
    studs: 3,
    colors: tone("#fda4af", ["#fb7185", "#e11d48", "#be123c"], "#881337", "rose"),
  },
  PostgreSQL: {
    desc: "Database",
    icon: Database,
    studs: 4,
    colors: tone("#93c5fd", ["#6f93b0", "#336791", "#1e4d6b"], "#16324a", "navy"),
  },
  Docker: {
    desc: "Containers",
    icon: Container,
    studs: 2,
    colors: tone("#93c5fd", ["#60a5fa", "#3b82f6", "#2563eb"], "#1d4ed8", "blue"),
  },
};

const FALLBACK_STUDS = ["cobalt", "teal", "orange", "indigo", "rose", "navy"] as const;

function fallbackBrick(name: string, index: number): Omit<StackModule, "id" | "name" | "group"> {
  const studs = name.length > 14 ? 4 : name.length > 9 ? 3 : 2;
  const studColor = FALLBACK_STUDS[index % FALLBACK_STUDS.length];
  return {
    desc: "Tool",
    icon: Boxes,
    studs,
    colors: tone("#d4d4d8", ["#a1a1aa", "#71717a", "#52525b"], "#3f3f46", studColor),
  };
}

function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildModules(): StackModule[] {
  return skills.flatMap((group) =>
    group.items.map((name, index) => {
      const entry = CATALOG[name] ?? fallbackBrick(name, index);
      return { id: slug(name), name, group: group.label, ...entry };
    }),
  );
}

const MODULES = buildModules();

function useBrickMetrics() {
  const [stud, setStud] = useState(BASE_STUD);

  useEffect(() => {
    const apply = () => {
      const pad = window.innerWidth >= 768 ? 80 : 48;
      const next = Math.min(BASE_STUD, (window.innerWidth - pad) / COLS);
      setStud((prev) => (Math.abs(prev - next) < 0.5 ? prev : next));
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  return {
    stud,
    row: Math.round(stud * (BASE_ROW / BASE_STUD)),
    apex: Math.round(BASE_APEX * (stud / BASE_STUD)),
  };
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const LegoStud = ({ color = "green", yOffset = 0 }: { color?: StudColor; yOffset?: number }) => {
  const theme = STUD_THEMES[color];

  return (
    <div className="relative flex flex-1 items-end justify-center" style={{ transform: `translateY(${yOffset}px)` }}>
      <div
        className="absolute bottom-[-3px] left-1/2 z-0 w-[75%] -translate-x-1/2 rounded-[50%]"
        style={{ height: "10px", background: theme.shadow }}
      />
      <div className="relative z-10" style={{ width: "72%", maxWidth: "42px", marginBottom: "-1px" }}>
        <div className="relative w-full overflow-hidden" style={{ height: "16px", borderRadius: "50% / 20%", background: theme.wall }}>
          <div
            className="absolute top-0 left-[20%] h-full w-[25%]"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)" }}
          />
        </div>
        <div
          className="absolute left-0 flex w-full items-center justify-center overflow-hidden rounded-[50%]"
          style={{
            top: "-8px",
            height: "16px",
            background: theme.cap,
            boxShadow: "inset 0px 2px 4px rgba(255,255,255,0.6), inset 0px -2px 4px rgba(0,0,0,0.2), 0px 1px 1px rgba(0,0,0,0.4)",
            borderTop: `1px solid ${theme.rim}`,
          }}
        >
          <span
            className="block h-[46%] w-[46%] rounded-full"
            style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.45), rgba(0,0,0,0.1) 72%)" }}
          />
        </div>
      </div>
    </div>
  );
};

const LegoBlock = ({
  mouseX,
  mouseY,
  colors,
  topHeight = 19,
  bottomHeight = 15,
  className = "",
  children,
  studs = 0,
  hideStuds = false,
  studYOffset = 12,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  colors: Pick<BrickColors, "topColor" | "faceGradient" | "bottomColor" | "studColor" | "shine">;
  topHeight?: number;
  bottomHeight?: number;
  className?: string;
  children: React.ReactNode;
  studs?: number;
  hideStuds?: boolean | number[];
  studYOffset?: number;
}) => {
  const highlightBg = useMotionTemplate`radial-gradient(circle 120px at ${mouseX}% ${mouseY}%, ${colors.shine}, transparent)`;

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className="relative w-full"
        style={{
          height: `${topHeight}px`,
          background: `linear-gradient(to bottom, ${colors.topColor}, color-mix(in srgb, ${colors.topColor} 82%, black))`,
          boxShadow: "inset 0px 0px 4px rgba(0,0,0,0.28)",
          borderRadius: "4px 4px 0 0",
        }}
      >
        {studs > 0 && (
          <div className="absolute bottom-full left-0 flex w-full">
            {Array.from({ length: studs }, (_, index) => {
              const isHidden = Array.isArray(hideStuds) ? hideStuds.includes(index) : hideStuds;
              return isHidden ? (
                <div key={index} className="flex-1" />
              ) : (
                <LegoStud key={index} color={colors.studColor} yOffset={studYOffset} />
              );
            })}
          </div>
        )}
      </div>
      <div className="relative w-full overflow-hidden border-x border-black/5" style={{ background: colors.faceGradient, boxShadow: "inset 0px 2px 6px rgba(255,255,255,0.47)" }}>
        <motion.div className="pointer-events-none absolute inset-0 z-20 opacity-70" style={{ background: highlightBg }} />
        <div className="relative z-30">{children}</div>
      </div>
      <div
        className="relative w-full"
        style={{
          height: `${bottomHeight}px`,
          background: colors.bottomColor,
          boxShadow: "inset 0px 2px 4px rgba(0,0,0,0.15)",
          borderRadius: "0 0 4px 4px",
        }}
      />
    </div>
  );
};

const ModuleBlock = ({
  module,
  studWidth,
  apex,
  hiddenStuds = [],
  pressed,
  isAnimating,
  startRect,
  mouseX,
  mouseY,
  onAnimationComplete,
  onClick,
}: {
  module: StackModule;
  studWidth: number;
  apex: number;
  hiddenStuds?: number[];
  pressed: boolean;
  isAnimating?: boolean;
  startRect?: DOMRect | null;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  onAnimationComplete?: () => void;
  onClick: (event: React.MouseEvent) => void;
}) => {
  const widthPx = module.studs * studWidth;
  const isCompact = module.studs <= 2;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onDone = useRef(onAnimationComplete);
  const startRef = useRef(startRect);
  const apexRef = useRef(apex);
  onDone.current = onAnimationComplete;
  startRef.current = startRect;
  apexRef.current = apex;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const origin = startRef.current;
    if (!isAnimating || !origin || !wrapper || prefersReducedMotion()) return;

    const endRect = wrapper.getBoundingClientRect();
    const dx = origin.left - endRect.left;
    const dy = origin.top - endRect.top;
    const apexY = Math.min(dy, 0) - apexRef.current;

    const animation = wrapper.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(1, 1)`, filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.2))", offset: 0 },
        { transform: `translate(${dx}px, ${dy}px) scale(1.08, 0.9)`, filter: "drop-shadow(0px 5px 5px rgba(0,0,0,0.3))", offset: 0.15 },
        { transform: `translate(${dx * 0.75}px, ${dy + (apexY - dy) * 0.5}px) scale(0.94, 1.1)`, filter: "drop-shadow(0px 30px 20px rgba(0,0,0,0.05))", offset: 0.35 },
        { transform: `translate(${dx * 0.5}px, ${apexY}px) scale(1, 1)`, filter: "drop-shadow(0px 40px 20px rgba(0,0,0,0))", offset: 0.55 },
        { transform: `translate(${dx * 0.25}px, ${apexY * 0.5}px) scale(0.94, 1.1)`, filter: "drop-shadow(0px 30px 20px rgba(0,0,0,0.05))", offset: 0.75 },
        { transform: `translate(0px, 0px) scale(1.08, 0.9)`, filter: "drop-shadow(0px 5px 5px rgba(0,0,0,0.3))", offset: 0.9 },
        { transform: `translate(0px, 0px) scale(1, 1)`, filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.2))", offset: 1 },
      ],
      { duration: 1100, easing: "cubic-bezier(0.25, 1, 0.5, 1)", fill: "both" },
    );

    const safety = window.setTimeout(() => onDone.current?.(), 1300);
    animation.onfinish = () => {
      window.clearTimeout(safety);
      onDone.current?.();
    };
    return () => {
      window.clearTimeout(safety);
      animation.cancel();
    };
  }, [isAnimating]);

  const Icon = module.icon;

  return (
    <div
      ref={wrapperRef}
      className={cn("lego-block-wrapper relative z-50", isAnimating && "pointer-events-none")}
      style={{ width: widthPx }}
    >
      <button
        type="button"
        onClick={onClick}
        aria-pressed={pressed}
        aria-label={pressed ? `Remove ${module.name} from the stack` : `Add ${module.name} to the stack`}
        className="group relative w-full shrink-0 cursor-pointer rounded-lg text-left transition-transform duration-200 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring active:scale-95"
      >
        <div className="pointer-events-none absolute inset-0 z-30 rounded-lg bg-white/0 transition-colors group-hover:bg-white/10" />
        <LegoBlock
          mouseX={mouseX}
          mouseY={mouseY}
          colors={module.colors}
          studs={module.studs}
          hideStuds={hiddenStuds}
        >
          <div className={cn("flex h-[60px] w-full items-center", isCompact ? "gap-2 px-2.5" : "gap-3 px-3.5")}>
            <div className={cn("flex shrink-0 items-center justify-center rounded-md", isCompact ? "h-7 w-7" : "h-9 w-9 rounded-lg", module.colors.iconBg)}>
              <Icon className={module.colors.iconColor} size={isCompact ? 16 : 22} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h4 className={cn("truncate font-hero font-bold tracking-wide", isCompact ? "text-[14px]" : "text-[16px]", module.colors.text)}>
                {module.name}
              </h4>
              {!isCompact && (
                <p className={cn("truncate font-hero text-[11px] font-medium", module.colors.subtext)}>{module.desc}</p>
              )}
            </div>
          </div>
        </LegoBlock>
      </button>
    </div>
  );
};

export type TechStackBuilderProps = {
  modules?: StackModule[];
  onComplete?: (stack: StackModule[]) => void;
  onSkip?: () => void;
  className?: string;
};

export function TechStackBuilder({ modules = MODULES, onComplete, onSkip, className }: TechStackBuilderProps) {
  const [equippedIds, setEquippedIds] = useState<string[]>([]);
  const [animatingBlocks, setAnimatingBlocks] = useState<Record<string, DOMRect>>({});
  const metrics = useBrickMetrics();
  const controls = useAnimation();
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const impactTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (impactTimer.current) window.clearTimeout(impactTimer.current);
    };
  }, []);

  const clearAnimation = (id: string) => {
    setAnimatingBlocks((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    mouseX.set((event.clientX / window.innerWidth) * 100);
    mouseY.set((event.clientY / window.innerHeight) * 100);
  };

  const handleToggleEquip = (id: string, event: React.MouseEvent) => {
    if (animatingBlocks[id]) return;
    const element = (event.currentTarget as HTMLElement).closest(".lego-block-wrapper");
    if (!element) return;

    const reduced = prefersReducedMotion();
    if (!reduced) {
      setAnimatingBlocks((prev) => ({ ...prev, [id]: element.getBoundingClientRect() }));
      if (impactTimer.current) window.clearTimeout(impactTimer.current);
      impactTimer.current = window.setTimeout(() => {
        controls.start({
          y: [0, 8, -2, 0],
          transition: { duration: 0.35, times: [0, 0.4, 0.7, 1], ease: "easeInOut" },
        });
      }, 1000);
    }

    setEquippedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const layout = useMemo(() => {
    const equipped = equippedIds
      .map((id) => modules.find((module) => module.id === id))
      .filter((module): module is StackModule => Boolean(module));
    const grid: (string | null)[][] = [];
    const positioned = equipped.map((module) => {
      let placedRow = -1;
      let placedCol = -1;
      for (let row = 0; row < 20 && placedRow === -1; row += 1) {
        if (!grid[row]) grid[row] = Array(COLS).fill(null);
        let run = 0;
        for (let col = 0; col < COLS; col += 1) {
          if (!grid[row][col]) {
            run += 1;
            if (run === module.studs) {
              placedRow = row;
              placedCol = col - module.studs + 1;
              break;
            }
          } else {
            run = 0;
          }
        }
      }
      if (placedRow === -1) {
        placedRow = 0;
        placedCol = 0;
      }
      for (let index = 0; index < module.studs; index += 1) {
        grid[placedRow][placedCol + index] = module.id;
      }
      return { module, rowIndex: placedRow, colIndex: placedCol };
    });
    return { grid, positioned, equipped };
  }, [equippedIds, modules]);

  const hiddenBaseStuds: number[] = [];
  layout.grid[0]?.forEach((occupantId, index) => {
    if (occupantId && !animatingBlocks[occupantId]) hiddenBaseStuds.push(index);
  });

  const stackRows = layout.positioned.length > 0 ? Math.max(...layout.positioned.map((item) => item.rowIndex)) + 1 : 0;
  const towerLift = stackRows > 0 ? stackRows * metrics.row + 36 : 0;
  const towerWidth = COLS * metrics.stud;

  const groups = useMemo(() => {
    const labels: string[] = [];
    for (const module of modules) {
      if (!labels.includes(module.group)) labels.push(module.group);
    }
    return labels
      .map((label) => ({
        label,
        modules: modules.filter((module) => module.group === label && !equippedIds.includes(module.id)),
      }))
      .filter((group) => group.modules.length > 0);
  }, [equippedIds, modules]);

  const baseColors = tone("#fde047", ["#facc15", "#eab308", "#ca8a04"], "#a16207", "yellow", true);

  return (
    <MotionConfig reducedMotion="user">
    <div onPointerMove={handlePointerMove} className={cn("relative w-full font-hero select-none", className)}>
      <p className="sr-only" aria-live="polite">
        {layout.equipped.length === 0
          ? "No skills on the stack."
          : `Stack: ${layout.equipped.map((module) => module.name).join(", ")}`}
      </p>

      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-8">
        <div className="order-2 min-w-0 flex-1 space-y-8 lg:order-1" aria-label="Available skills">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="font-sans text-sm text-muted-foreground">{group.label}</h3>
              <div className="mt-3 flex flex-wrap gap-4">
                {group.modules.map((module) => {
                  const startRect = animatingBlocks[module.id];
                  return (
                    <ModuleBlock
                      key={module.id}
                      module={module}
                      studWidth={metrics.stud}
                      apex={metrics.apex}
                      pressed={false}
                      mouseX={mouseX}
                      mouseY={mouseY}
                      isAnimating={Boolean(startRect)}
                      startRect={startRect ?? null}
                      onAnimationComplete={() => clearAnimation(module.id)}
                      onClick={(event) => handleToggleEquip(module.id, event)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
          {groups.length === 0 && <p className="font-sans text-sm text-muted-foreground">Every brick is on the stack.</p>}
        </div>

        <div className="relative z-30 order-1 flex w-full flex-col items-center gap-6 lg:order-2 lg:w-auto" aria-label="Skill stack">
          <motion.div animate={controls} className="relative" style={{ width: towerWidth, marginTop: towerLift }}>
            <div className="absolute left-0 z-20 h-0 w-full" style={{ bottom: "calc(100% - 14px)" }}>
              {layout.positioned.map(({ module, rowIndex, colIndex }) => {
                const hiddenLocalStuds: number[] = [];
                const rowAbove = layout.grid[rowIndex + 1];
                if (rowAbove) {
                  for (let index = 0; index < module.studs; index += 1) {
                    const occupantId = rowAbove[colIndex + index];
                    if (occupantId && !animatingBlocks[occupantId]) hiddenLocalStuds.push(index);
                  }
                }
                const startRect = animatingBlocks[module.id];
                return (
                  <div
                    key={module.id}
                    className="absolute"
                    style={{
                      bottom: rowIndex * metrics.row,
                      left: colIndex * metrics.stud,
                      zIndex: startRect ? 80 : rowIndex * 10,
                    }}
                  >
                    <ModuleBlock
                      module={module}
                      studWidth={metrics.stud}
                      apex={metrics.apex}
                      hiddenStuds={hiddenLocalStuds}
                      pressed
                      mouseX={mouseX}
                      mouseY={mouseY}
                      isAnimating={Boolean(startRect)}
                      startRect={startRect ?? null}
                      onAnimationComplete={() => clearAnimation(module.id)}
                      onClick={(event) => handleToggleEquip(module.id, event)}
                    />
                  </div>
                );
              })}
            </div>

            <LegoBlock
              mouseX={mouseX}
              mouseY={mouseY}
              colors={baseColors}
              studs={COLS}
              hideStuds={hiddenBaseStuds}
              className="relative z-10 shadow-[0_15px_35px_rgba(28,61,50,0.18)]"
            >
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-950/10 shadow-inner">
                  <User className="h-6 w-6 text-yellow-950" aria-hidden="true" />
                </div>
                <div className="min-w-0 text-yellow-950">
                  <h3 className="truncate font-hero text-[17px] font-bold tracking-wide">The stack</h3>
                  <p className="mt-1 font-hero text-[10px] font-bold tracking-[0.18em] text-yellow-950/70 uppercase">
                    {layout.equipped.length === 0 ? "Click a brick" : `${layout.equipped.length} of ${modules.length}`}
                  </p>
                </div>
              </div>
            </LegoBlock>
          </motion.div>

          <div className="flex min-h-16 w-full max-w-sm flex-col items-center gap-3">
            <AnimatePresence mode="wait">
              <motion.p
                key={equippedIds.join("-") || "empty"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-center font-sans text-sm leading-relaxed text-foreground"
              >
                {layout.equipped.length === 0
                  ? "Nothing stacked yet."
                  : layout.equipped.map((module) => module.name).join(" · ")}
              </motion.p>
            </AnimatePresence>

            {onComplete && layout.equipped.length > 0 && (
              <button
                type="button"
                onClick={() => onComplete(layout.equipped)}
                className="rounded-xl bg-foreground px-6 py-3 font-hero text-sm font-medium tracking-wide text-background transition-transform hover:scale-[1.03] active:scale-95"
              >
                Keep this set
              </button>
            )}
            {onSkip && (
              <button type="button" onClick={onSkip} className="font-hero text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Skip for now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    </MotionConfig>
  );
}

export default TechStackBuilder;
export { TechStackBuilder as Component, TechStackBuilder as LegoOnboarding };
