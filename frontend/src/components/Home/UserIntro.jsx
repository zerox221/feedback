import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Copy, CopyCheck } from "lucide-react";
import { check } from "zod";
import api from "@/api/axios";


const UserIntro = () => {
  const { user } = useContext(userContext);
  const [enabled, setEnabled] = useState(false);
  const [copy, setCopy] = useState(false);
  const [loading, setLoading] = useState(false);

  const copyToClipboard = async (text) => {
    console.log("text is : ", text);
    try {
      await navigator.clipboard.writeText(text);
      setCopy(true);
      toast.success("copied");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  useEffect(() => {
    setEnabled(user?.acceptingFeedback ?? false);
  }, [user]);

  if (check) {
    setTimeout(() => {
      setCopy(false);
    }, 4000);
  }

  async function changeSwitch(value) {
    if (loading) return;
    setLoading(true);
    console.log("value : ", value);
    setEnabled(!enabled);
    try {
      const response = await api.post("/user/change/switch", { change: value });
      console.log("response : ", response.data.message);
      if (response.data.value === true) {
        toast.success(
          "Accepting feedback People can send you anonymous feedback using your link.",
        );
      } else {
        toast.error(
          "Feedback paused People can't send you new feedback right now.",
        );
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message || "error");
      }
      console.log("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full  flex flex-col gap-4  border-b border-gray-200  py-5  ">
      <div className="flex flex-col  gap-2">
        <span className="text-lg font-semibold text-black">
          Hey {user?.userName || "Guest"}!
        </span>
        <span className="text-gray-700">
          Here's what's happening with your feedback.
        </span>
      </div>
      <div className="w-full h-10 relative  flex  gap-4">
        <div className="p-2 justify-between h-full flex items-center  bg-gray-200 w-full md:w-[80%] rounded-md ">
          <span className="text-sm text-gray-600">
            {user?.profileUrl || "failed"}
          </span>
          <span className="text-gray-500">
            {!copy ? (
              <Copy
                onClick={() => copyToClipboard(user?.profileUrl)}
                size={18}
              />
            ) : (
              <CopyCheck className="text-blue-600" size={18} />
            )}
          </span>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Switch
          disabled={loading}
          checked={enabled}
          onCheckedChange={changeSwitch}
        />
        <h1>accepting message : {enabled ? "ON" : "OFF"}</h1>
      </div>
    </div>
  );
};

export default UserIntro;
