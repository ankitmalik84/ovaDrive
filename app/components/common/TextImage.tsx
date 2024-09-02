import { FC, useRef, useEffect } from "react";
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

  useEffect(() => {
    if (contentRef.current) {
      if (id !== 3) {
        gsap.fromTo(
          contentRef.current,
          { y: 125, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.3,
            ease: "power1.inOut",
            pin: true,
            scrollTrigger: {
              trigger: textImageRef.current, // Trigger animation based on the textImageRef
              start: "top 70%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      } else {
        gsap.fromTo(
          contentRef.current,
          { x: 800, y: 400, autoAlpha: 0 },
          {
            x: 0,
            y: 0,
            autoAlpha: 1,
            duration: 1.3,
            ease: "power1.inOut",
            pin: true,
            scrollTrigger: {
              trigger: textImageRef.current,
              start: "top 70%",
              end: "bottom 20%",
              toggleActions: "play play play reverse",
            },
          }
        );
      }
    }
  }, []);

  const words = title.split(" ");

  return (
    <div
      ref={textImageRef}
      className={`w-full max-w-[1400px] h-[100vh] overflow-hidden`}
    >
      <div
        ref={contentRef}
        className={`mx-auto flex gap-3 sm:gap-4 md:gap-12 h-[100vh] items-center  ${
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
                  size="text-4xl"
                  type="bold"
                />
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </h1>
          {description && (
            <p className="mt-4 sm:mt-8 text-white opacity-75 text-md leading-6 sm:leading-7 text-[15px] sm:text-base">
              {description + id}
            </p>
          )}
        </div>
        <div className="w-full sm:w-2/5 h-[300px] relative">
          <Image src={img} alt="img" layout="fill" objectFit="cover" priority />
        </div>
      </div>
    </div>
  );
};

export default TextImage;
