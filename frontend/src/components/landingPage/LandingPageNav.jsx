import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPageNav = () => {
  const navigate = useNavigate();

  return (
    <div className="h-20 flex  items-center justify-between cursor-pointer px-5 md:px-15 ">
      <div onClick={() => navigate("/")} className="text-xl font-semibold">
        Feedback
      </div>

      {/* part 2 */}
      <div className="md:flex hidden items-center gap-10">
        <span
          className="text-sm text-[#0A0A0A]"
          onClick={() => navigate("/register")}
        >
          Sign In
        </span>
        <span
          onClick={() => navigate("/register")}
          className="text-sm bg-[#0A0A0A]  p-2 px-3 rounded-md text-white"
        >
          Get Started
        </span>
      </div>
    </div>
  );
};

export default LandingPageNav;
