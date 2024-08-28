"use client";
import AnimatedButton from "@/app/components/AnimatedButton";

import HighLightText2 from "@/app/components/common/HighLightText2";
import { GoArrowUpRight } from "react-icons/go";

export default function Model() {
  return (
    <div className="h-[400px] sm:h-[500px] bg-customBlack2 flex m-auto w-full rounded-lg relative overflow-hidden">
      {/* Light Effect */}
      <div className="flex justify-between">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-conic-gradient3 sm:bg-conic-gradient"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-conic-gradient4 sm:bg-conic-gradient2"></div>
      </div>

      <div className="w-[250px] sm:w-[380px] md:w-[420px] text-center mx-auto space-y-4 sm:space-y-7 py-8 sm:py-24 relative z-10 flex flex-col gap-12 sm:gap-8">
        <div>
          <HighLightText2
            text="Master your data, seize your life, shape your future with OvaDrive"
            index={10}
          />
        </div>
        <div className="flex justify-center">
          <AnimatedButton
            text="Try OvaDrive"
            highlightText="OvaDrive"
            bgcolor="bg-white"
            textcolor="text-customBlack"
            bordercolor="border-black"
            height="h-10"
            width="w-32"
            icon={GoArrowUpRight}
            onClickFn={() => (window.location.href = "/")}
          />
        </div>
      </div>

      {/* Stronger Blur Effect at the Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-customBlack2 via-[rgba(0,0,0,0.7)] to-transparent blur-2xl"></div>
    </div>
  );
}
