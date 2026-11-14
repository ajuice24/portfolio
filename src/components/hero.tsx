import AnimatorTitlePreloader from "@/components/ui/animator-title-preloader";
import { profile } from "@/data/portfolio";

export function Hero() {
  const [given, ...rest] = profile.name.split(" ");

  return (
    <section id="top" className="scroll-mt-6">
      <h1 className="sr-only">
        {profile.name}, {profile.role}
      </h1>
      <AnimatorTitlePreloader
        kicker={profile.role}
        title={given}
        connector=""
        name={rest.join(" ")}
        meta=""
        scene=""
        preset="paper"
        hud={false}
        palette={{ stage: "#f3eadf" }}
        label={`${profile.name}, ${profile.role}`}
      />
    </section>
  );
}
