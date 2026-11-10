import { skills } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-6">
      <div className="mx-auto w-full max-w-6xl py-16 pr-6 pl-[4.75rem] md:py-24 md:pr-10 md:pl-24">
        <h2 className="font-display text-4xl tracking-tight">Skills</h2>
        <dl className="mt-8 grid gap-8 border-t border-foreground/15 pt-8 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.label}>
              <dt className="text-sm text-muted-foreground">{group.label}</dt>
              <dd className="mt-3 max-w-md leading-relaxed">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
