import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Hamburger from "hamburger-react";
import Link from "next/link";
import Button from "@/app/components/common/Button";
import data from "@/app/data.json";
import ProfileDropDown from "@/app/components/ProfileDropDown";
import useOnClickOutside from "@/app/hook/useOnClickOutside";

const NavBar: React.FC = () => {
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Home");
  const ref = useRef<HTMLDivElement | null>(null);
  const [screenSize, setScreenSize] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null); // New state for hovered item

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useOnClickOutside(ref, () => setOpen(false));

  const handleNavClick = (url: string) => {
    if (url.startsWith("#")) {
      const section = document.querySelector(url);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(url);
    }
  };

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const path = usePathname();
  const pageName = capitalizeFirstLetter(path.split("/")[1]);

  const renderButtons = () => (
    <>
      <Button
        text="Sign Up"
        bgcolor="bg-transparent"
        textcolor="text-customPurple"
        bordercolor="border-customPurple"
        height="h-9"
        width="w-24"
        onClickFn={() => router.push("/signup")}
      />
      <Button
        text="Login"
        bgcolor="bg-customPurple"
        textcolor="text-white"
        bordercolor="border-customPurple"
        height="h-9"
        width="w-24"
        onClickFn={() => router.push("/signin")}
      />
    </>
  );

  return (
    <nav className="py-4 px-4 flex items-center justify-center">
      {path.split("/")[1] != "" ? (
        <>
          {/* Logo and Page Name for Documentation */}
          <div className="flex items-center space-x-2 w-[17rem]">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-8 sm:w-10 h-8 sm:h-10 object-cover rounded-full"
              />
            </Link>
            <div className="text-white text-md sm:text-lg w-20">OvaDrive</div>
          </div>
          <div className="flex justify-between w-full">
            {path.split("/")[1] !== "documentation" ? (
              <div className="my-auto lg:opacity-0 text-white text-base sm:text-lg lg:ml-[8%] 2xl:ml-[15%] 3xl:ml-[20%]">
                {pageName}
              </div>
            ) : (
              <div className="my-auto text-white text-base sm:text-lg lg:ml-[8%] 2xl:ml-[15%] 3xl:ml-[20%]">
                {pageName}
              </div>
            )}
            {!session.data?.user ? (
              <>
                {/* Button Rendering */}
                <div className="hidden sm:flex space-x-2 sm:space-x-4">
                  {renderButtons()}
                </div>
                <div className="block sm:hidden">
                  <Hamburger
                    size={20}
                    color="#ffffff"
                    toggled={open}
                    toggle={setOpen}
                  />
                  {open && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex z-[900] absolute top-8 right-8 bg-customBlack rounded-lg border-[1px]"
                      ref={ref}
                    >
                      <div className="flex flex-col space-y-2 w-32 divide-y-[1px]">
                        <button
                          className="text-sm p-2 flex hover:text-gray-400"
                          onClick={() => handleNavClick("/signup")}
                        >
                          Sign Up
                        </button>
                        <button
                          className="text-sm p-2 flex hover:text-gray-400"
                          onClick={() => handleNavClick("/signin")}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <ProfileDropDown
                email={session.data?.user?.email}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            )}
          </div>
        </>
      ) : (
        <div
          className={`fixed z-10 flex justify-between w-[97%] md:w-[94%] ${
            isOpen && screenSize >= 1024 && screenSize < 1280
              ? "lg:w-[82%] mr-[6rem]"
              : "lg:w-[90%]"
          } xl:w-9/12 border border-[#ffffff88] rounded-full items-center px-1 sm:p-2 bg-white bg-opacity-30 backdrop-blur-md top-6 sm:top-4`}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="flex items-center space-x-2">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-10 h-10 object-cover rounded-full"
              />
            </Link>
          </div>
          <div className="hidden md:flex">
            <ul className="flex space-x-2 lg:space-x-5 xl:space-x-8 text-white text-xs md:text-sm items-center">
              {data.navLinks.map((item) => (
                <li
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  className="relative" // Add relative positioning for the dropdown
                >
                  <Link
                    href={item.url}
                    onClick={() => {
                      setSelected(item.name);
                      handleNavClick(item.url);
                    }}
                    className={`${
                      item.name === selected
                        ? "bg-customBlack2 p-2 rounded-full"
                        : ""
                    } hover:text-gray-400 ease-out duration-300`}
                  >
                    {item.name}
                  </Link>
                  {/* Check for subLinks and render them on hover */}
                  {item.subLinks.length > 0 && hoveredItem === item.id && (
                    <div
                      onMouseEnter={() => setHoveredItem(item.id)}
                      className="absolute z-10 mt-5 bg-customBlack text-white rounded-lg ring-1 ring-white ring-opacity-70"
                    >
                      {item.subLinks.map((subLink) => (
                        <Link
                          key={subLink.id}
                          href={subLink.url}
                          className="block px-4 py-3"
                          onClick={() => handleNavClick(subLink.url)}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:flex gap-2 items-center">
            <Button
              text="Get The App"
              bgcolor="bg-customPurple"
              textcolor="text-white"
              bordercolor="border-customPurple"
              height="h-7 sm:h-10"
              width="w-24 lg:w-28"
              onClickFn={() => handleNavClick("/")}
            />
            {!session.data?.user ? (
              <Button
                text="Login"
                bgcolor="bg-transparent"
                textcolor="text-white"
                bordercolor="border-white"
                height="h-7 sm:h-10"
                width="w-24 lg:w-28"
                onClickFn={() => router.push("/signin")}
              />
            ) : (
              <ProfileDropDown
                email={session.data?.user?.email}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            )}
          </div>
          <div className="block md:hidden">
            <Hamburger
              size={20}
              color="#ffffff"
              toggled={open}
              toggle={setOpen}
            />
            {open && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex z-[900] absolute top-8 right-8 bg-customBlack rounded-lg border-[1px]"
                ref={ref}
              >
                <div className="flex flex-col space-y-2 w-32 divide-y-[1px]">
                  {data.navLinks.map((item) => (
                    <button
                      key={item.id}
                      className="text-sm p-2 flex hover:text-gray-400"
                      onClick={() => handleNavClick(item.url)}
                    >
                      {item.name}
                    </button>
                  ))}
                  {!session.data?.user && (
                    <>
                      <button
                        className="text-sm p-2 flex hover:text-gray-400"
                        onClick={() => handleNavClick("/signup")}
                      >
                        Sign Up
                      </button>
                      <button
                        className="text-sm p-2 flex hover:text-gray-400"
                        onClick={() => handleNavClick("/signin")}
                      >
                        Login
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
