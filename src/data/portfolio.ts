export type WorkMark = "signal" | "orbit" | "horizon" | "plan" | "shelves";

export type Work = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  context: string;
  period: string;
  stack: string[];
  href?: string;
  /** Set after adding a file in public/work, e.g. "/work/sahana.jpg". */
  image?: string;
  mark: WorkMark;
};

export type Education = {
  period: string;
  title: string;
  school: string;
  place: string;
  note: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Award = {
  mark: string;
  title: string;
  year: string;
  detail: string;
  icon: "medal" | "certificate";
};

export const profile = {
  name: "Mohamed Ajmal Ahmed",
  role: "Full-stack developer",
  location: "Hulhumale, Maldives",
  email: "ajmalpomp124@gmail.com",
  github: "https://github.com/ajuice24",
  linkedin: "https://www.linkedin.com/in/mohamed-ajmal-5abb432b7/",
  summary:
    "I build web platforms for public services, hospitals, and content teams — interfaces that stay clear when the work is real.",
  earlier: "Earlier: frontend at Loopcraft, and full-stack at SME Digital.",
  now: {
    org: "MindCo",
    title: "Full-stack developer",
    note: "Government sites and content systems.",
    place: "Malé, since August 2026",
  },
};

export const works: Work[] = [
  {
    slug: "sahana",
    title: "Sahana",
    summary: "A platform for disaster and emergency response.",
    detail:
      "Sahana is my final-year project at Maldives National University. It gives a response team one place to manage information, resources, and communication, with an interface built to stay fast when people are in a hurry.",
    context: "Maldives National University",
    period: "Feb 2025 — Present",
    stack: ["React", "Laravel", "PostgreSQL", "Tailwind CSS"],
    mark: "signal",
  },
  {
    slug: "space-explorer",
    title: "Space Explorer",
    summary: "A 3D space simulation that runs in the browser.",
    detail:
      "A self-directed study in real-time graphics. The scene, camera, and motion are rendered with Three.js inside a Next.js app, so the simulation is just a page you can open.",
    context: "Self-directed",
    period: "Aug 2025 — Oct 2025",
    stack: ["Next.js", "React", "TypeScript", "Three.js"],
    href: "https://space-explorerr.vercel.app/",
    mark: "orbit",
  },
  {
    slug: "from-maldives",
    title: "From Maldives",
    summary: "A content-managed site for the Maldives fisheries sector.",
    detail:
      "Built at Loopcraft. The public site carries products and articles, and a Payload CMS lets the team publish without waiting on a developer.",
    context: "Loopcraft",
    period: "Aug 2025 — Sep 2025",
    stack: ["Next.js", "React", "Payload CMS"],
    mark: "horizon",
  },
  {
    slug: "igmh",
    title: "IGMH",
    summary: "A hospital website for services, doctors, and facilities.",
    detail:
      "A responsive site for IGMH, also at Loopcraft. Services, people, and facilities sit in a custom Payload CMS so the hospital can keep the pages current.",
    context: "Loopcraft",
    period: "Apr 2025 — Jun 2025",
    stack: ["Next.js", "React", "Payload CMS"],
    mark: "plan",
  },
  {
    slug: "storefront",
    title: "Commerce storefront",
    summary: "A shop front and the admin desk behind it.",
    detail:
      "Customer listings and featured products, plus a dashboard for inventory and product updates. The aim was a clear place to browse, and a back office that stays in step with the shelf.",
    context: "Self-made",
    period: "May 2024 — May 2025",
    stack: ["Storefront", "Admin dashboard", "Inventory"],
    mark: "shelves",
  },
];

export const education: Education[] = [
  {
    period: "Feb 2021 — Nov 2021",
    title: "CAE English",
    school: "Centre for Higher Secondary Education",
    place: "Malé",
    note: "Cambridge English qualification, completed before the computer science degree.",
  },
  {
    period: "Feb 2023 — Jul 2026",
    title: "BSc Computer Science",
    school: "Maldives National University",
    place: "Malé",
    note: "Finished in 2026. Sahana, the disaster-management platform, was the final-year project.",
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Interface",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "Expo"],
  },
  {
    label: "Systems",
    items: ["Payload CMS", "Strapi", "TanStack Start", "Hono", "Laravel"],
  },
  {
    label: "Data & delivery",
    items: ["PostgreSQL", "Docker"],
  },
];

export const awards: Award[] = [
  {
    mark: "Gold",
    title: "MNU Robotics Hackathon",
    year: "2025",
    detail:
      "First place for a cube-collector robot. I led the mechanical design and the control logic.",
    icon: "medal",
  },
  {
    mark: "CCNA",
    title: "Cisco networking",
    year: "Associate",
    detail: "Routing, switching, IP addressing, and the basics of network security.",
    icon: "certificate",
  },
  {
    mark: "CCNA 2",
    title: "Routing and WAN",
    year: "Associate",
    detail: "VLANs, RIP, OSPF, access lists, wireless, and a secure multi-site WAN.",
    icon: "certificate",
  },
];
