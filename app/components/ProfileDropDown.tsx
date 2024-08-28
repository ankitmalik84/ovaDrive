"use client";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface ProfileDropDownProps {
  email: any;
}

const ProfileDropDown: React.FC<ProfileDropDownProps> = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const router = useRouter();
  const handleLogout = () => {
    signOut();
    router.push("/signin");
  };

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="bg-pink-600 w-10 h-10 text-center flex justify-center items-center rounded-full font-bold p-2 text-xl cursor-pointer mr-3"
      >
        {session?.data?.user?.email?.charAt(0)}
      </div>
      {isOpen && (
        <div className="absolute top-[72px] right-4 sm:right-16 mx-2 md:mx-4 border-2 rounded-lg">
          <div
            onClick={handleLogout}
            className="p-1 bg-customBlack2 border-1 rounded-lg shadow-md cursor-pointer"
          >
            Log Out
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDropDown;
