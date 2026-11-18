"use client";

import { ProjectShowcase, type ShowcaseProject } from "@/components/ui/project-showcase";
import { works } from "@/data/portfolio";

function yearFrom(period: string) {
  return period.match(/\d{4}/)?.[0] ?? period;
}

export function WorkSection() {
  const projects: ShowcaseProject[] = works.flatMap((work) => {
    if (!work.image || !work.href) return [];
    return [
      {
        title: work.title,
        description: work.summary,
        year: yearFrom(work.period),
        href: work.href,
        image: work.image,
      },
    ];
  });

  return <ProjectShowcase projects={projects} />;
}
