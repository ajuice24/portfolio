import { profile } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 py-12 pr-6 pl-[4.75rem] md:flex-row md:items-end md:justify-between md:py-16 md:pr-10 md:pl-24">
        <div>
          <p className="font-display text-3xl tracking-tight">{profile.name}</p>
          <p className="mt-2 text-sm text-background/75">
            {profile.role} · {profile.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-11 cursor-pointer items-center underline decoration-background/40 underline-offset-4 hover:decoration-background"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 cursor-pointer items-center underline decoration-background/40 underline-offset-4 hover:decoration-background"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 cursor-pointer items-center underline decoration-background/40 underline-offset-4 hover:decoration-background"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
