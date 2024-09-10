"use client";

import { FC, useRef, useEffect, useMemo, useCallback } from "react";
import HighLightText from "./HighLightText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";

interface TextImageProps {
  id: number;
  title: string;
  description?: string;
  highlightIndex?: number;
  leading?: string;
  img: string;
  position: "left" | "right";
}

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const TextImage: FC<TextImageProps> = ({
  title,
  description,
  highlightIndex = -1,
  leading = "",
  img,
  position,
  id = -1,
}) => {
  const textImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const smoothScroll = useCallback((direction: number) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: `+=${window.innerHeight * direction}`,
        autoKill: false,
      },
      ease: "power2.inOut",
    });
  }, []);

  const setupAnimation = useCallback(() => {
    if (!contentRef.current) return;

    let animation;
    if (id === 1) {
      animation = {
        from: { x: 800, autoAlpha: 0 },
        to: {
          x: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power1.inOut",
        },
        scrollTrigger: {
          trigger: textImageRef.current,
          start: "top 98%",
          end: "bottom 2%",
          // markers: true,
          toggleActions: "play play play reverse",
          onEnterBack: () => smoothScroll(-0.98),
          // onLeave: () => smoothScroll(0.98),
          // onLeaveBack: () => smoothScroll(-0.95),
        },
      };
    } else if (id !== 3) {
      animation = {
        from: { autoAlpha: 0 },
        to: {
          autoAlpha: 1,
          duration: 1,
          ease: "power1.inOut",
        },
        scrollTrigger: {
          trigger: textImageRef.current,
          start: "top 98%",
          end: "bottom 2%",
          // markers: true,
          toggleActions: "play stop stop reverse",
          onEnter: () => smoothScroll(0.98),
          onEnterBack: () => smoothScroll(-0.98),
        },
      };
    } else {
      animation = {
        from: { xPercent: 100, yPercent: 100, autoAlpha: 0 },
        to: {
          xPercent: 0,
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power1.inOut",
        },
        scrollTrigger: {
          trigger: textImageRef.current,
          start: "top 98%",
          end: "bottom 2%",
          // markers: true,
          toggleActions: "play play play reverse",
          onEnter: () => smoothScroll(0.95),
          onEnterBack: () => smoothScroll(-0.98),
        },
      };
    }

    gsap.fromTo(contentRef.current, animation.from, {
      ...animation.to,
      scrollTrigger: animation.scrollTrigger,
    });
  }, [id, smoothScroll]);

  useEffect(() => {
    setupAnimation();
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [setupAnimation]);

  const words = useMemo(() => title.split(" "), [title]);

  return (
    <div
      ref={textImageRef}
      className="w-full max-w-[1200px] h-[100vh] overflow-hidden border-1 border-white"
    >
      <div
        ref={contentRef}
        className={`mx-auto flex gap-3 sm:gap-4 md:gap-12 h-[100vh] items-center ${
          position === "right"
            ? "flex-col sm:flex-row-reverse"
            : "flex-col sm:flex-row"
        }`}
      >
        <div className="w-full sm:w-3/5 flex flex-col">
          <h1
            className={`text-3xl sm:text-4xl font-bold ${leading} text-white`}
          >
            {words.map((word, index) =>
              index === highlightIndex ? (
                <HighLightText
                  key={index}
                  text={word + " "}
                  size="text-4xl italic"
                  type="bold"
                />
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </h1>
          {description && (
            <p className="mt-4 sm:mt-8 text-white opacity-75 text-md leading-6 sm:leading-7 text-[15px] sm:text-base">
              {description}
            </p>
          )}
        </div>
        <div className="w-full sm:w-2/5 h-[300px] relative">
          <Image
            src={img}
            alt="Text image"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default TextImage;
