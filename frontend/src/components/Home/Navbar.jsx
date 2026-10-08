import React from "react";
import { useContext, useState } from "react";
import { userContext } from "../../context/userContext";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/api/axios";
const Navbar = () => {
  const { user , setUser } = useContext(userContext);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  async function handleLogout() {
    if (loading) return;
    setLoading(true);
    try {
      const response = await api.get("/auth/logout");
      toast.success("Logged out successfully");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error while logging out:", error);
    } finally {
      
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-15  flex items-center border border-b border-gray-300 justify-between px-4 md:px-8">
      <div className="text-black text-2xl font-bold">Feedback</div>
      <div className="md:flex items-center gap-10 hidden">
        <span className=" text-black ">
          Welcome, {user?.userName || "Guest"}
        </span>
        <button className=" text-white font-medium text-sm px-2 py-2 bg-[#2563EB] rounded">
          Dashboard
        </button>
        <button  onClick={handleLogout} className=" text-white font-medium text-sm px-2 py-2 bg-[#2563EB] rounded">
          {loading ? <Spinner /> : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
