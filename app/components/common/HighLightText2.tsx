"use client";
import { FC } from "react";

interface HighLightText2Props {
  text: string;
  index: number;
}

const HighLightText2: FC<HighLightText2Props> = ({ text, index }) => {
  const words = text.split(/\s+/);

  return (
    <span className="relative font-bold text-2xl sm:text-3xl md:text-4xl text-center">
      {words.map((word, idx) => (
        <span
          key={word + idx}
          className={idx >= index ? "text-customPurple" : ""}
        >
          {word}{" "}
        </span>
      ))}
    </span>
  );
};

export default HighLightText2;
