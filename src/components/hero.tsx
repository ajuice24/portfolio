import { profile } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="top" className="scroll-mt-6 flex min-h-svh flex-col bg-foreground text-background">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between pt-16 pr-6 pb-12 pl-[4.75rem] md:pt-24 md:pr-10 md:pb-16 md:pl-24">
        <div>
          <p className="text-sm text-background/80">{profile.role}</p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(3.25rem,8vw,6.75rem)] leading-[0.92] font-medium tracking-[-0.03em] text-balance">
            Mohamed Ajmal Ahmed
          </h1>
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="max-w-xl text-lg leading-relaxed text-background/85">{profile.summary}</p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-1">
              <a
                href="#path"
                className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-background/50 underline-offset-4 hover:decoration-background"
              >
                The path
              </a>
              <a
                href="#work"
                className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-background/50 underline-offset-4 hover:decoration-background"
              >
                Selected work
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-background/50 underline-offset-4 hover:decoration-background"
              >
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 cursor-pointer items-center text-sm underline decoration-background/50 underline-offset-4 hover:decoration-background"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-background/80 lg:col-span-5 lg:justify-self-end">
            Now {profile.now.title.toLowerCase()} at {profile.now.org}. {profile.now.note} {profile.now.place}.
          </p>
        </div>
      </div>
    </section>
  );
}
