import { awards } from "@/data/portfolio";

export function Awards() {
  return (
    <section id="awards" className="scroll-mt-6">
      <div className="mx-auto w-full max-w-6xl py-16 pr-6 pl-[4.75rem] md:py-24 md:pr-10 md:pl-24">
        <h2 className="font-display text-4xl tracking-tight">Awards</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {awards.map((award) => (
            <li key={award.title} className="flex h-full flex-col border border-foreground/20 bg-card p-6">
              <p className="text-sm text-accent">
                {award.mark} · {award.year}
              </p>
              <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight">{award.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{award.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
