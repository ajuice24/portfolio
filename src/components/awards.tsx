import { awards } from "@/data/portfolio";

export function Awards() {
  return (
    <section id="awards">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-24">
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
