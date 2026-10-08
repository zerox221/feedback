import api from "@/api/axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { userContext } from "@/context/userContext";

const ShareFeedBack = () => {
  const navigate = useNavigate();
  const userName = window.location.pathname.split("/")[2];
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [genratingFeedback, setGenratingFeedback] = useState(false);
 

  console.log("User Name: ", userName);

  async function sendFeedback() {
    if (input.trim() == "" || input.length < 8) {
      console.log("input is empty");
      toast.error("message must contain more then 8 characters");
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const response = await api.post(
        `user/share/feedback/?userName=${userName}`,
        { content: input },
        {
          skipAuthRefresh: true,
        },
      );

      toast.success("feedback shared successfully");

      setInput("");
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      console.log("error while sharing feedback");
    } finally {
      setLoading(false);
    }
  }

  async function genrateFeedbacks() {
    if (genratingFeedback) return;
    setGenratingFeedback(true);
    try {
      const response = await api.get("/user/genrate/feedbacks");
      setFeedbacks(response.data.feedback);
    } catch (error) {
      console.log("error");
    } finally {
      setGenratingFeedback(false);
    }
  }



  return (
    <div className="flex min-h-screen items-start justify-center bg-[#f5f5f5] px-4 py-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-205 pt-8">
        <div className="mx-auto flex w-full max-w-170 flex-col items-center">
          <div className="mb-8 flex  w-full items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-[1.05rem] font-semibold text-[#111827]">
                {userName}
              </span>
              <span className="text-[0.9rem] text-[#6b7280]">@{userName}</span>
            </div>
          </div>

          <h1 className="mb-4 w-full  text-[1rem] font-semibold tracking-[-0.04em] text-[#111827] sm:text-[1.25rem]">
            Send anonymous feedback to @{userName}
          </h1>

          <div className="w-full rounded-[14px] border border-[#d1d5db] bg-[#f5f5f5]">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your anonymous message..."
              className="h-45 w-full resize-none border-0 bg-transparent p-4 text-[1.1rem] text-[#111827] placeholder:text-[#6b7280] focus:outline-none"
            />
          </div>

          <div className="mt-5 flex w-full items-center justify-start gap-3">
            <button
              disabled={genratingFeedback}
              onClick={sendFeedback}
              className="rounded-md md:rounded-[10px] bg-black px-5 py-2 md:py-3 text-xs md:text-sm font-semibold text-white shadow-sm transition hover:bg-[#1f2937]"
            >
              {loading ? (
                <div className="flex items-center gap-1">
                  <Spinner /> Sharing...
                </div>
              ) : (
                "Send Feedback"
              )}
            </button>
            <button
              onClick={genrateFeedbacks}
              className="rounded-md md:rounded-[10px] border border-[#d1d5db] bg-white px-5  py-2 md:py-3 text-xs md:text-sm font-medium text-[#111827] transition hover:bg-[#f9fafb]"
            >
              {genratingFeedback ? (
                <span className="flex  items-center gap-1">
                  <Spinner />
                  genrating...
                </span>
              ) : (
                "Generate with AI"
              )}
            </button>
          </div>

          <div className="w-full my-8 rounded-[14px] border border-[#e5e7eb] bg-white p-4 sm:p-6">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Suggested feedback
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                {genrateFeedbacks.length === 0
                  ? "Click on genrate with AI button to genrate feedbacks"
                  : "Click any suggestion to use it as your message."}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {feedbacks?.map((feedback, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setInput(feedback)}
                  className="
          group w-full text-left
          rounded-xl border border-gray-200
          bg-gray-50/50
          px-4 py-3
          text-sm text-gray-700
          transition-all duration-200
          hover:border-blue-300
          hover:bg-blue-50/40
          hover:text-gray-900
          focus:outline-none
          focus:ring-2 focus:ring-blue-500/20
          active:scale-[0.99]
        "
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0    items-center justify-center rounded-full bg-white border border-gray-200 text-[11px] font-medium text-gray-500   group-hover:border-blue-200 group-hover:text-blue-600">
                      {index + 1}
                    </span>

                    <span className="leading-6">{feedback}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex w-full items-center justify-start gap-2 text-[0.9rem] text-[#4b5563]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M7 10V7a5 5 0 0 1 10 0v3" />
              <rect x="5" y="10" width="14" height="10" rx="2" />
            </svg>
            <span>Your message is anonymous.</span>
          </div>

          <div className="mt-8 flex w-full items-center justify-between gap-4 border-t border-[#d1d5db] pt-6 text-[1rem] text-[#4b5563]">
            <span>Want your own feedback page?</span>
            <button
              onClick={() => navigate("/")}
              className="rounded-md md:rounded-[10px] border border-[#111827] bg-white px-4 py-2 text-xs md:text-[1rem] font-medium text-[#111827] transition hover:bg-[#f9fafb]"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareFeedBack;
