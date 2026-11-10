import { path } from "@/data/portfolio";

export function CareerPath() {
  return (
    <section id="path" className="scroll-mt-6 mx-auto w-full max-w-6xl py-20 pr-6 pl-[4.75rem] md:py-28 md:pr-10 md:pl-24">
      <h2 className="font-display text-4xl tracking-tight md:text-5xl">The path</h2>
      <ol className="mt-10 grid gap-4 md:grid-cols-2">
        {path.map((step) => (
          <li key={step.org + step.period}>
            <article
              className={`flex h-full flex-col border bg-card p-6 ${
                step.current ? "border-accent" : "border-foreground/20"
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm text-muted-foreground">{step.period}</p>
                {step.current ? <p className="text-sm text-accent">Now</p> : null}
              </div>
              <h3 className="mt-5 font-display text-3xl leading-tight tracking-tight">{step.title}</h3>
              <p className="mt-2 text-base">{step.org}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{step.note}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
