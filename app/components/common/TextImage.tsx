import { FC } from "react";
import HighLightText from "./HighLightText";
import Image from "next/image";
interface TextImageProps {
  title: string;
  description?: string;
  highlightIndex?: number;
  leading?: string;
  img: string;
  position: string;
  aos: string;
}

const TextImage: FC<TextImageProps> = ({
  title,
  description,
  highlightIndex = -1,
  leading,
  img,
  position,
  aos,
}) => {
  const words = title.split(" ");

  return (
    <div
      data-aos={aos}
      className={`${description && "my-16"} w-full mx-auto flex gap-3 ${
        position === "right"
          ? "flex-col sm:flex-row-reverse"
          : "flex-col sm:flex-row"
      }`}
    >
      <div className="w-full sm:w-3/5 flex flex-col">
        <h1
          className={`text-3xl sm:text-4xl font-bold ${
            leading || ""
          } text-white`}
        >
          {words.map((word, index) =>
            index === highlightIndex ? (
              <HighLightText
                key={word + index}
                text={word + " "}
                size="text-4xl"
                type="bold"
              />
            ) : (
              <span key={word + index}>{word} </span>
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
          alt="img"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </div>
  );
};

export default TextImage;
