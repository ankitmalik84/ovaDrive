import { FC } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/legacy/image";

interface SliderItem {
  id: number;
  img: string;
}

interface SliderCompProps {
  heading: string;
  data: SliderItem[];
}

const SliderComp: FC<SliderCompProps> = ({ heading, data }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    speed: 1000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-white text-3xl mb-8">{heading}</h2>
      <Slider {...settings}>
        {data.map((item) => (
          <div key={item.id} className="px-1">
            <div className="relative h-[300px] w-full">
              <Image
                src={item.img}
                alt="Slider Image"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComp;
