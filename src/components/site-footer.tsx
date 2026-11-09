import { profile } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="font-display text-2xl tracking-tight">{profile.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {profile.role} · {profile.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-11 cursor-pointer items-center underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 cursor-pointer items-center underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 cursor-pointer items-center underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
