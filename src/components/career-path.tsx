import Timeline, { type TimelineItem } from "@/components/ui/timeline";

const loopcraft = {
  src: "/logos/loopcraft.svg",
  alt: "Loopcraft logo",
  aspect: 31 / 48,
};

const mnu = {
  src: "/assets/photo_2026-11-15_02-35-15-removebg-preview.png",
  alt: "The Maldives National University",
  aspect: 1,
  view: { x: 72 / 400, y: 47 / 400, w: 256 / 400, h: 308 / 400 },
};

const sme = {
  src: "/logos/sme-digital.png",
  alt: "SME Digital logo",
  aspect: 1212 / 806,
  view: { x: 52 / 1212, y: 112 / 806, w: 1107 / 1212, h: 582 / 806 },
};

const mindco = {
  src: "/logos/mindco.png",
  alt: "MindCo logo",
  aspect: 644 / 642,
};

const topItems: TimelineItem[] = [
  {
    id: "mnu-start",
    year: "2023",
    month: "February",
    logo: mnu,
    heading: "February 2023 — BSc Computer Science",
    content:
      "Started my journey in computer science, building a foundation in programming, software engineering, and problem-solving.",
  },
  {
    id: "loopcraft-frontend",
    year: "2025",
    month: "February",
    logo: loopcraft,
    heading: "February 2025 — Frontend Developer, Loopcraft",
    content:
      "Transitioned into a full-time role, building responsive interfaces and contributing to 15+ projects.",
  },
  {
    id: "sme-digital",
    year: "2026",
    month: "June",
    logo: sme,
    heading: "June 2026 — Full-Stack Developer, SME Digital",
    content:
      "Expanded into full-stack development, contributing to web and mobile applications across modern technologies.",
  },
  {
    id: "mindco",
    year: "2026",
    month: "August",
    logo: mindco,
    heading: "August 2026 — Full-Stack Developer, MindCo",
    content:
      "Started building government digital solutions, working across modern full-stack technologies and CMS-driven platforms.",
  },
];

const bottomItems: TimelineItem[] = [
  {
    id: "loopcraft-intern",
    year: "2024",
    month: "January",
    logo: loopcraft,
    heading: "January 2024 — Frontend Intern, Loopcraft",
    content:
      "Entered the industry, learning frontend development through hands-on experience with real-world projects.",
  },
  {
    id: "mnu-degree",
    year: "2026",
    month: "July",
    logo: mnu,
    heading: "July 2026 — Graduated, Maldives National University",
    content:
      "Completed my BSc in Computer Science, with Sahana — a disaster management platform — as my final-year project.",
  },
];

export function CareerPath() {
  return (
    <Timeline
      id="path"
      title="My Path"
      periodLabel="2023 — Now"
      textColor="#1c3d32"
      mutedTextColor="#345c4c"
      activeColor="#8a7d6c"
      backgroundColor="#f3eadf"
      imageUrl="/assets/photo_2026-11-15_02-04-59.jpg"
      imageAlt="Portrait of Mohamed Ajmal Ahmed"
      topItems={topItems}
      bottomItems={bottomItems}
    />
  );
}
