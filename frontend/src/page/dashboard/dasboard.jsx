import React from "react";
import Navbar from "../../components/Home/Navbar";
import { Outlet } from "react-router-dom";
import UserIntro from "../../components/Home/UserIntro";
import AiSummary from "@/components/Home/AiSummary";
import Feedbacks from "@/components/Home/Feedbacks";
const dasboard = () => {
  return (
    <div className="min-h-screen w-full px-3 flex flex-col gap-8 md:px-15 py-4 ">
      <UserIntro />
      <AiSummary/>
      <Feedbacks/>
    </div>
  );
};

export default dasboard;
