import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import data from "@/app/data.json";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  data: string;
  img: string;
}

const teamMembers: TeamMember[] = data.team;

export default function OurTeam() {
  const leftSliderSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    speed: 800,
    arrows: false,
  };

  const rightSliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    speed: 800,
    arrows: false,
    breakpoints: [
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className=" mx-auto h-[700px] md:h-[400px] lg:h-[500px]  w-full">
      <h1 className="text-3xl font-bold mb-10">Our Team</h1>
      <div className="flex flex-col md:flex-row w-full">
        {/* Left Side: One slider for content, one for images */}
        <div className="w-full lg:w-1/2 flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <Slider {...leftSliderSettings}>
              {teamMembers.map((member) => (
                <div key={member.id} className="h-[280px] sm:h-[420px] w-full">
                  <div className="p-1 sm:p-2">
                    <h2 className="text-xl sm:text-2xl font-semibold">
                      {member.name}
                    </h2>
                    <p className="mt-2 sm:mt-4 text-sm sm:text-base leading-5 sm:leading-6">
                      {member.data}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-full sm:w-1/2">
            <Slider {...leftSliderSettings}>
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="h-[280px] sm:h-[420px] w-full border-2 relative"
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Right Slider: Next Two Images */}
        <div className="hidden lg:block lg:w-1/2">
          <Slider {...rightSliderSettings}>
            {teamMembers.map((_, index) => {
              const nextIndex1 = (index + 1) % teamMembers.length;

              return (
                <div key={index} className="h-[420px] pt-[55px]">
                  <div className="p-1">
                    <div className="h-[360px] w-full border-2 relative">
                      <Image
                        src={teamMembers[nextIndex1].img}
                        alt={teamMembers[nextIndex1].name}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}
