"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AOS from "aos";
import "aos/dist/aos.css";

import Button from "@/app/components/common/Button";
import SliderComp from "@/app/components/common/Slider";
import Model from "@/app/components/Model";
import HighLightText2 from "@/app/components/common/HighLightText2";
import OurTeam from "@/app/components/OurTeam";
import TextImage from "@/app/components/common/TextImage";
import NavBar from "./components/NavBar";

import data from "./data.json";

export default function Home() {
  const heroThird = useRef<HTMLDivElement>(null);
  const heroSecond = useRef<HTMLDivElement>(null);
  const heroFirst = useRef<SVGSVGElement>(null);
  const heroSection = useRef<HTMLDivElement>(null);
  const highText = useRef<HTMLDivElement>(null);
  const highSubText = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    AOS.init();

    const scaleValue = window.innerWidth <= 768 ? 32 : 25;
    gsap.set(heroFirst.current, {
      scale: scaleValue,
      // y: window.innerWidth <= 768 ? 0 : -1151,
      // x: window.innerWidth <= 768 ? 0 : 450,
      autoAlpha: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection.current,
        start: "top top+=80px",
        end: "bottom bottom",
        pin: true,
        onUpdate: (self) => {
          const progressThreshold = window.innerWidth >= 768 ? 0.08 : 0.2;
          gsap.to(heroFirst.current, {
            autoAlpha: self.progress > progressThreshold ? 1 : 0,
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
      duration: 1,
    });

    tl.to(
      heroSecond.current,
      {
        yPercent: -100,
        ease: "expo.inOut",
        duration: 1.2,
        onComplete: () => {
          const screenHeight = window.innerHeight;
          if (window.scrollY < 2 * screenHeight) {
            // Scroll the window a little bit after the animation completes
            gsap.to(window, {
              scrollTo: { y: 600 }, // Scroll down by 600px
              duration: 1.2, // Duration for scrolling
              ease: "power1.inOut", // Easing for smoothness
            });
          }
        },
      },
      "<"
    );

    gsap.fromTo(
      highText.current,
      { autoAlpha: 0, y: 100 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        ease: "power1.inOut",
        pin: true,
        scrollTrigger: {
          trigger: highSubText.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in",
    });
    AOS.refresh();
  }, []);

  return (
    <div className="px-2 lg:px-12 pt-20 sm:pt-14 overflow-x-clip">
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
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/hero.png)",
            filter: "blur(8px)",
          }}
        ></div>
        {/* Hero section second layer (content) */}
        <div
          ref={heroSecond}
          className="absolute inset-0 flex flex-col items-center px-4 lg:px-12"
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
                className="text-[16vw] md:text-[10vw] font-extrabold flex justify-center"
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
          className="flex w-full h-[100vh] lg:w-[64%] mx-auto py-16 sm:py-24 items-center"
          ref={highText}
        >
          <div ref={highSubText} className="flex w-full items-center">
            <HighLightText2
              text={
                "OvaDrive isn't just about saving your chats,\nIt's the beginning to make your Soul Immortal"
              }
              index={13}
            />
          </div>
        </div>
        <div
          data-aos="zoom-out"
          id="about-us"
          className="py-2 sm:py-10 h-[100vh] overflow-hidden"
        >
          <div
            className="flex flex-col my-24 h-[380px]"
            data-aos="slide-up"
            data-aos-delay="10"
          >
            <SliderComp data={data.slider1} heading="OvaDrive" />
          </div>
        </div>
        <div
          className="flex items-center h-[100vh] sm:h-[100vh]"
          id="our-team"
          data-aos="zoom-out-up"
          data-aos-delay="50"
        >
          <OurTeam />
        </div>
        <div className="pt-56 sm:pt-32 h-[100vh]" data-aos="fade-up">
          <Model />
        </div>
      </div>
    </div>
  );
}
