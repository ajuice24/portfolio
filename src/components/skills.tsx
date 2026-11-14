import { skills } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-24">
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
