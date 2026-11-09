import { Awards } from "@/components/awards";
import { EducationTimeline } from "@/components/education-timeline";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Skills } from "@/components/skills";
import { WorkSection } from "@/components/work-section";

export default function Home() {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[60] focus:bg-foreground focus:px-4 focus:py-3 focus:text-sm focus:text-background"
      >
        Skip to content
      </a>
      <SiteHeader />
      <div className="pl-[4.75rem] md:pl-24">
        <main id="content">
          <Hero />
          <WorkSection />
          <EducationTimeline />
          <Skills />
          <Awards />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
