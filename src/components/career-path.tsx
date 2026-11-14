import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { path } from "@/data/portfolio";

const logos: Record<string, Pick<CoverflowSlide, "src" | "alt" | "imageClassName">> = {
  Loopcraft: {
    src: "/logos/loopcraft.svg",
    alt: "Loopcraft logo",
    imageClassName: "object-contain p-[8%]",
  },
  "SME Digital": {
    src: "/logos/sme-digital.png",
    alt: "SME Digital logo",
    imageClassName: "object-contain p-[10%]",
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
    <section id="path" className="w-full px-3 py-20 sm:px-5 md:py-28">
      <CoverflowCarousel
        slides={slides}
        initialIndex={current === -1 ? 0 : current}
        showCaption
        showNavigation
        showPagination
        label="Career path"
        cardWidth="clamp(240px, 46vw, 440px)"
        cardClassName="bg-card"
      />
    </section>
  );
}
