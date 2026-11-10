import { education } from "@/data/portfolio";

export function EducationTimeline() {
  return (
    <section id="education" className="scroll-mt-6">
      <div className="mx-auto w-full max-w-6xl py-16 pr-6 pl-[4.75rem] md:py-24 md:pr-10 md:pl-24">
        <h2 className="font-display text-4xl tracking-tight">Education</h2>
        <ul className="mt-8 border-t border-foreground/15">
          {education.map((item) => (
            <li key={item.title} className="grid gap-1 border-b border-foreground/15 py-5 md:grid-cols-12 md:gap-8">
              <p className="text-sm text-muted-foreground md:col-span-4">{item.period}</p>
              <div className="md:col-span-8">
                <h3 className="font-display text-2xl tracking-tight">{item.title}</h3>
                <p className="mt-1 text-muted-foreground">
                  {item.school}, {item.place}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
