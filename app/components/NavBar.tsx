import { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Hamburger from "hamburger-react";
import Link from "next/link";
import Button from "@/app/components/common/Button";
import data from "@/app/data.json";
import ProfileDropDown from "@/app/components/ProfileDropDown";
import useOnClickOutside from "@/app/hook/useOnClickOutside";

const NavBar: React.FC = () => {
  // const [isClient, setIsClient] = useState(false);
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Home");
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, () => setOpen(false));

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) {
  //   return null;
  // }

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
      {path.split("/")[1] === "documentation" ? (
        <>
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
            <div className="my-auto text-white text-md sm:text-lg">
              {pageName}
            </div>
            {!session.data?.user ? (
              <>
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
              <ProfileDropDown email={session.data?.user?.email} />
            )}
          </div>
        </>
      ) : (
        <div className="fixed z-10 flex justify-between w-[96%] md:w-11/12 lg:w-9/12 border-[1px] border-white rounded-full items-center px-1 sm:p-2 bg-customGray top-6 sm:top-4">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-10 h-10 object-cover rounded-full"
              />
            </Link>
          </div>
          <div className="hidden sm:flex">
            <ul className="flex space-x-2 md:space-x-5 text-white text-xs md:text-sm items-center">
              {data.navLinks.map((item) => (
                <li key={item.id}>
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
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden sm:flex">
            <Button
              text="Get The App"
              bgcolor="bg-customPurple"
              textcolor="text-white"
              bordercolor="border-customPurple"
              height="h-7 sm:h-9"
              width="w-24 sm:w-28"
              onClickFn={() => handleNavClick("/")}
            />
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
                className="flex z-[900] absolute top-0 right-0 bg-customBlack rounded-lg border-[1px]"
                ref={ref}
              >
                <div className="flex flex-col divide-y-2 w-36">
                  <ul className="flex flex-col space-y-2 text-sm divide-y-2">
                    {data.navLinks.map((item) => (
                      <li key={item.id} className="py-2 pl-2">
                        <Link
                          href={item.url}
                          onClick={() => handleNavClick(item.url)}
                          className="hover:text-gray-400"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="text-sm py-2 pl-2 flex hover:text-gray-400"
                    onClick={() => handleNavClick("/")}
                  >
                    Get The App
                  </button>
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
