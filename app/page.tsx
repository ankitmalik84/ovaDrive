//app/page.tsx
"use client";

import { useRef, useEffect, useCallback, use } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import debounce from "lodash/debounce";

import Button from "@/app/components/common/Button";
import SliderComp from "@/app/components/common/Slider";
import Model from "@/app/components/Model";
import HighLightText2 from "@/app/components/common/HighLightText2";
import OurTeam from "@/app/components/OurTeam";
import TextImage from "@/app/components/common/TextImage";
import NavBar from "./components/NavBar";
import data from "./data.json";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const heroThird = useRef<HTMLDivElement>(null);
  const heroSecond = useRef<HTMLDivElement>(null);
  const heroFirst = useRef<SVGSVGElement>(null);
  const heroSection = useRef<HTMLDivElement>(null);
  const highText = useRef<HTMLDivElement>(null);
  const highSubText = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const team = useRef<HTMLDivElement>(null);
  const model = useRef<HTMLDivElement>(null);
  const memberImageRef = useRef<HTMLDivElement>(null);
  const decoration = useRef<HTMLDivElement>(null);
  var temp: any = useRef<HTMLDivElement>(null);

  const smoothScroll = useCallback((target: string | number) => {
    if (typeof target === "string") {
      const element = document.querySelector(target);
      if (element) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: element, offsetY: 80 },
          ease: "power2.inOut",
        });
      }
    } else {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: `+=${window.innerHeight * target}`,
          autoKill: false,
        },
        ease: "power2.inOut",
      });
    }
  }, []);

  // initially set the decoration to be hidden
  useEffect(() => {
    // Initial setting of the decoration element
    gsap.set(decoration.current, {
      autoAlpha: 0,
    });

    const handleScroll = () => {
      // Check if scroll is less than 0.8 screen heights (approximately 0.8 screens)
      const threshold = window.innerHeight * 0.8;
      const scrollY = window.scrollY;
      if (
        scrollY < threshold ||
        temp.current === team.current ||
        temp.current === model.current
      ) {
        gsap.to(decoration.current, { autoAlpha: 0 });
      } else {
        // Show the decoration if the scroll position is greater than or equal to 1.5 screens
        gsap.to(decoration.current, { autoAlpha: 1 });
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [temp]);

  // Debounce the smoothScroll function
  const debouncedSmoothScroll = debounce(smoothScroll, 200);

  const setupHeroAnimations = useCallback(() => {
    const scaleValue = window.innerWidth <= 768 ? 32 : 25;
    gsap.set(heroFirst.current, {
      scale: scaleValue,
      autoAlpha: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection.current,
        start: "top top+=80px",
        end: "bottom bottom",
        pin: true,
        scrub: 3,
        onUpdate: (self) => {
          const progressThreshold = window.innerWidth >= 768 ? 0.08 : 0.2;
          gsap.to(heroFirst.current, {
            autoAlpha: self.progress > progressThreshold ? 1 : 0,
          });
          const blurValue = self.progress > 0.5 ? "8px" : "0px";
          gsap.to(heroThird.current, {
            filter: `blur(${blurValue})`,
          });
        },
        toggleActions: "reverse play play reverse",
      },
    });

    tl.to(heroFirst.current, {
      scale: 1,
      y: 0,
      x: 0,
      ease: "expoScale",
      duration: 2,
    });

    tl.to(
      heroSecond.current,
      {
        yPercent: -100,
        ease: "expo.inOut",
        duration: 1.8,
        scrub: 1,
        onComplete: () => {
          smoothScroll(0.7);
        },
      },
      "<"
    );
  }, [debouncedSmoothScroll]);

  const setupScrollAnimations = useCallback(() => {
    const elements = [
      { ref: highText, direction: 0.85 },
      { ref: slider, direction: 0.8, id: "about-us" },
      { ref: team, direction: 0.85, id: "our-team" },
      { ref: model, direction: 1 },
    ];

    ScrollTrigger.batch(
      elements.map((el) => el.ref.current),
      {
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            stagger: 0.15,
            overwrite: true,
            duration: 0.8,
            ease: "power2.inOut",
          });
        },
        onLeave: (batch) => {
          gsap.set(batch, { autoAlpha: 0, overwrite: true });
        },
        onEnterBack: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            stagger: 0.15,
            overwrite: true,
            duration: 0.8,
            ease: "power2.inOut",
          });
        },
        onLeaveBack: (batch) => {
          gsap.set(batch, { autoAlpha: 0, overwrite: true });
        },
      }
    );

    elements.forEach(({ ref, direction, id }, index) => {
      ScrollTrigger.create({
        trigger: ref.current,
        markers: false,
        scrub: 1,
        start: `top ${88}%`,
        end: `bottom ${15}%`,
        onEnter: () => {
          temp.current = ref.current;
          if (typeof direction === "number") {
            debouncedSmoothScroll(direction);
          }

          if (ref.current === team.current || ref.current === model.current) {
            gsap.to(decoration.current, {
              autoAlpha: 0,
              duration: 1,
              ease: "power2.inOut",
            });
          }
        },
        onEnterBack: () => {
          temp.current = ref.current;
          if (typeof direction === "number") {
            debouncedSmoothScroll(-direction);
          }

          if (ref.current === team.current || ref.current === model.current) {
            temp.current = ref.current;
            gsap.to(decoration.current, {
              autoAlpha: 0,
              duration: 1,
              ease: "power2.inOut",
            });
          }
        },
      });
    });
  }, [debouncedSmoothScroll]);

  useEffect(() => {
    setupHeroAnimations();
    setupScrollAnimations();

    const handleNavClick = (event: CustomEvent) => {
      const targetId = event.detail;
      smoothScroll(targetId);
    };

    window.addEventListener("navClick", handleNavClick as EventListener);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      debouncedSmoothScroll.cancel();
      window.removeEventListener("navClick", handleNavClick as EventListener);
    };
  }, [
    setupHeroAnimations,
    setupScrollAnimations,
    debouncedSmoothScroll,
    smoothScroll,
  ]);
  return (
    <div className="relative min-h-screen">
      {/* outer decroative border */}
      <div
        ref={decoration}
        className="fixed h-[103vh] -translate-y-5 inset-0 z-40 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_75%,#A600FC_150%)]"
      ></div>
      {/* main Page Content */}
      <div className="z-10 min-h-screen px-2 lg:px-12 pt-20 sm:pt-14 overflow-x-clip transition-all ease-in-out duration-500 scroll-smooth">
        <NavBar />
        {/* Hero Section */}
        <div
          ref={heroSection}
          className="relative h-[70vh] sm:h-[85vh] overflow-hidden justify-center items-center flex flex-col"
        >
          {/* Hero section third layer (background image) */}
          <div
            id="hero"
            ref={heroThird}
            className="absolute inset-0 bg-cover bg-center bg-texture-gradient"
          ></div>
          {/* Hero section second layer (content) */}
          <div
            ref={heroSecond}
            className="absolute inset-0 flex flex-col items-center px-4 lg:px-12 backdrop-blur-lg"
          >
            <div className="w-full max-w-6xl text-center space-y-4 flex flex-col justify-center h-full">
              <div className="text-white opacity-75 text-md lg:text-lg">
                The Ultimate AI Assistant
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white">
                Unlock The Power Of Your 2nd Brain
              </h2>
              <div className="w-full sm:w-5/6 mx-auto flex flex-col gap-4">
                <p className="mt-2 text-white opacity-75 text-base lg:text-lg">
                  Ovadrive is designed to turn your phone into an assistant
                  following you everywhere, learning all about your life and
                  helping to utilize that.
                </p>
                <p className="font-bold text-white text-base lg:text-lg">
                  Own your data, own your life, own your future.
                </p>
              </div>
            </div>

            <div className="mt-3 mb-5 flex flex-row space-x-2 justify-end w-full">
              <Button
                text="Android App"
                bgcolor="bg-customPurple"
                textcolor="text-white"
                bordercolor="border-customPurple"
                height="h-9"
                width="w-28 sm:w-28"
                onClickFn={() => (window.location.href = "/")}
              />
              <Button
                text="iOS App"
                bgcolor="bg-customPurple"
                textcolor="text-white"
                bordercolor="border-customPurple"
                height="h-9"
                width="w-20 sm:w-28"
                onClickFn={() => (window.location.href = "/")}
              />
              <Button
                text="Learn More"
                bgcolor="bg-transparent"
                textcolor="text-white"
                bordercolor="border-white"
                height="h-9"
                width="w-24 sm:w-28"
                onClickFn={() => (window.location.href = "/")}
              />
            </div>
          </div>

          {/* Hero section first layer (text overlay) */}
          <svg
            ref={heroFirst}
            className="absolute inset-0 flex items-center justify-center autoAlpha-0 overflow-hidden"
            height="102vh"
            width="100vw"
          >
            <defs>
              <mask id="mask">
                <rect width="100vw" height="102vh" fill="white" />
                <text
                  x="48%"
                  y="50%"
                  textAnchor="middle"
                  dy=".35em"
                  className="text-[16vw] md:text-[8vw] font-extrabold flex justify-center"
                  fill="black"
                >
                  OVA DRIVE
                </text>
              </mask>
            </defs>
            <rect width="100vw" height="102vh" fill="black" mask="url(#mask)" />
          </svg>
        </div>
        {/* components */}
        <div>
          {/* text-image section */}
          <div className="flex flex-col items-center">
            {data.content.map((item: any) => (
              <TextImage
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                highlightIndex={item.highlightIndex}
                img={item.img}
                position={item.position}
              />
            ))}
          </div>
          <div
            className="flex w-full h-[100vh] mx-auto py-16 sm:py-24 items-cente"
            ref={highText}
          >
            <div
              ref={highSubText}
              className="flex w-full items-center justify-center"
            >
              <HighLightText2
                text={
                  "OvaDrive isn't just about saving your chats,\nIt's the beginning to make your Soul Immortal"
                }
                breakIndex={7}
                index={13}
              />
            </div>
          </div>
          <div
            ref={slider}
            id="about-us"
            className="py-2 sm:py-10 h-[100vh] overflow-hidden border-1 border-white"
          >
            <div className="flex flex-col my-24 h-[380px]">
              <SliderComp data={data.slider1} heading="About Us" />
            </div>
          </div>
          <div
            ref={team}
            className="flex items-center h-[100vh] border-1 border-white relative"
            id="our-team"
          >
            <div
              ref={memberImageRef}
              className="-ml-12 absolute inset-0 z-0 w-screen h-screen bg-cover transition-all ease-in-out duration-500"
              style={{
                filter: "blur(14px)",
              }}
            ></div>
            <div className="relative z-10 w-full">
              <OurTeam ref={memberImageRef} />
            </div>
          </div>
          <div
            ref={model}
            className="pt-[200px] sm:pt-[10%] h-[100vh] border-1 border-white"
          >
            <Model />
          </div>
        </div>
      </div>
    </div>
  );
}
