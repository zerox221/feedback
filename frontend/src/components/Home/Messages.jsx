import React from "react";
import DeleteMessageButton from "./DeleteMessageButton";

const Messages = ({ feedback }) => {
  const date = new Date(feedback?.createdAt);
  const formatted = date.toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="group md:w-[48%] md:h-30 relative w-full  rounded-md border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Message */}
      <div className="pr-10">
        <p className="text-[15px] leading-6 font-medium text-gray-900">
          {feedback?.content}
        </p>

        <p className="mt-2 text-xs text-gray-400">{formatted}</p>
      </div>

      {/* Delete */}
      <DeleteMessageButton id={feedback._id}  />
    </div>
  );
};

export default Messages;
