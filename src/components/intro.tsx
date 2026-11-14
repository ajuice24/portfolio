"use client";

import { Code2, Lightbulb, PenLine, Sparkles, Wrench } from "lucide-react";

import {
  AnnotatedText,
  AnnotatedTextChip,
  AnnotatedTextCycle,
} from "@/components/ui/annotated-text";

export function Intro() {
  return (
    <section aria-label="About" className="px-6 pt-8 pb-6 md:px-10 md:pt-14 md:pb-8">
      <p className="mx-auto max-w-3xl text-center font-display text-[clamp(1.45rem,3.1vw,2.35rem)] leading-[1.55] text-balance text-foreground">
        I&apos;m a{" "}
        <AnnotatedTextChip icon={<Code2 />}>Full-Stack Developer,</AnnotatedTextChip>{" "}
        passionate about turning{" "}
        <AnnotatedText variant="underline" animate>
          ideas
        </AnnotatedText>{" "}
        into{" "}
        <AnnotatedText variant="highlight" animate delay={120}>
          impactful
        </AnnotatedText>{" "}
        digital experiences. I love crafting{" "}
        <AnnotatedText variant="wavy" animate delay={200}>
          intuitive
        </AnnotatedText>{" "}
        interfaces, building{" "}
        <AnnotatedText variant="box" animate delay={280}>
          reliable
        </AnnotatedText>{" "}
        systems, and solving problems through code. Driven by{" "}
        <AnnotatedTextChip icon={<Lightbulb />}>curiosity</AnnotatedTextChip> and{" "}
        <AnnotatedText variant="circle" animate delay={360}>
          creativity,
        </AnnotatedText>{" "}
        I&apos;m always{" "}
        <AnnotatedTextCycle
          loop
          interval={2200}
          label="learning, building, and making"
          items={[
            { label: "learning", icon: <Sparkles /> },
            { label: "building", icon: <Wrench /> },
            { label: "making", icon: <PenLine /> },
          ]}
        />{" "}
        and finding new ways to make technology{" "}
        <AnnotatedText variant="arrow" animate delay={440}>
          meaningful.
        </AnnotatedText>
      </p>
    </section>
  );
}
