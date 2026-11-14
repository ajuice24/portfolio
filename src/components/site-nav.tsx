"use client";

import ImmersiveFullscreenNav from "@/components/ui/immersive-full-screen-nav";
import { profile } from "@/data/portfolio";

const images = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=80",
];

export function SiteNav() {
  return (
    <ImmersiveFullscreenNav
      navConfig={{
        brand: profile.name,
        brandHref: "#top",
        overlayBg: "#16130f",
        headerOpenColor: "#f6efe4",
        clipOrigin: "left",
      }}
      navContent={{
        agencyName: "",
        tagline: "",
        location: profile.location,
        links: [
          { label: "My Career", href: "#path" },
          { label: "Project", href: "#work" },
          { label: "Skills", href: "#skills" },
          { label: "Certification", href: "#awards" },
        ],
        images,
        socials: [
          { type: "github", href: profile.github },
          { type: "linkedin", href: profile.linkedin },
        ],
      }}
    />
  );
}
