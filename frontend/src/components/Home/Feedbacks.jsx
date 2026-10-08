import { RefreshCcw } from "lucide-react";
import React, { useContext, useState, useEffect } from "react";
import Messages from "./Messages";
import { userContext } from "@/context/userContext";
import { Spinner } from "@/components/ui/spinner";

const Feedbacks = () => {
  const { user, setUser, feedbacks, setFeedbacks, getAllFeedbacks, refresh } =
    useContext(userContext);
  const [loader, setLoader] = useState(false);

  async function refreshMessages() {
    getAllFeedbacks();
  }

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        getAllFeedbacks();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="min-h-50 w-full flex flex-col gap-5  ">
      <div>
        <div
          onClick={refreshMessages}
          className="h-10 w-15 rounded-md border border-gray-200 bg-white  shadow-sm flex justify-center items-center"
        >
          {refresh ? (
            <Spinner />
          ) : (
            <RefreshCcw size={18} className="text-gray-600" />
          )}
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-full  flex-wrap md:justify-between gap-5">
        {feedbacks.length === 0 ? (
          <span className="font-medium text-sm ">No messages to display.</span>
        ) : (
          feedbacks.map((feedback) => {
            return <Messages feedback={feedback} key={feedback._id} />;
          })
        )}
      </div>
    </div>
  );
};

export default Feedbacks;
