import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { path } from "@/data/portfolio";

const logos: Record<string, Pick<CoverflowSlide, "src" | "alt" | "imageClassName">> = {
  Loopcraft: {
    src: "/logos/loopcraft.svg",
    alt: "Loopcraft logo",
    imageClassName: "object-contain p-[8%]",
  },
  "SME Digital": {
    src: "/logos/sme-digital.jpg",
    alt: "SME Digital logo",
  },
  MindCo: {
    src: "/logos/mindco.png",
    alt: "MindCo logo",
  },
};

export function CareerPath() {
  const slides: CoverflowSlide[] = path.map((step) => {
    const logo = logos[step.org];
    return {
      src: logo.src,
      alt: logo.alt,
      imageClassName: logo.imageClassName,
      title: step.title,
      subtitle: step.note,
      meta: [
        { label: "Company", value: step.org },
        { label: "When", value: step.period },
        ...(step.current ? [{ label: "Status", value: "Now" }] : []),
      ],
    };
  });
  const current = path.findIndex((step) => step.current);

  return (
    <section id="path" className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <h2 className="font-display text-4xl tracking-tight md:text-5xl">The path</h2>
      <div className="mt-4">
        <CoverflowCarousel
          slides={slides}
          initialIndex={current === -1 ? 0 : current}
          showCaption
          showNavigation
          showPagination
          label="Career path"
          cardWidth="clamp(180px, 34vw, 300px)"
          cardClassName="bg-card"
        />
      </div>
    </section>
  );
}
