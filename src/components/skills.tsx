import { TechStackBuilder } from "@/components/ui/interactive-tech-stack-builder";

export function Skills() {
  return (
    <section id="skills" className="overflow-x-clip">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <h2 className="font-display text-4xl tracking-tight">Skills</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
          The tools I build with. Click a brick to set it on the stack, and click it again to take it off.
        </p>
        <TechStackBuilder className="mt-8" />
      </div>
    </section>
  );
}
