import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { userContext } from "@/context/userContext";
import { Sparkles, Lightbulb, MessageSquareText } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const AiSummary = () => {
  const { user } = useContext(userContext);

  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  async function GenrateAiSummary() {
    if (loading || insight) return;

    if (user?.feedbacks?.length < 3) {
      setInsight(null);
      return;
    }

    setLoading(true);

    try {
      const response = await api.get("/user/summerise/feedbacks");

      const data = JSON.parse(response.data.summerisedFeedbacks);

      console.log(data)

      setInsight(data);
      
    } catch (error) {
      console.log("Error generating AI summary:", error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(()=>{
console.log("insights : ",insight)
  },[insight])

  const feedbackCount = user?.feedbacks?.length || 0;
  const hasEnoughFeedback = feedbackCount >= 3;

  return (
    <section className="w-full border-b border-gray-200 py-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <Sparkles
                size={16}
                className="text-blue-600"
                strokeWidth={2}
              />
            </div>

            <h2 className="text-sm font-semibold text-gray-900 md:text-lg">
              AI Feedback Insights
            </h2>
          </div>

          <p className="mt-1 hidden text-xs text-gray-400 sm:block">
            Understand what people are saying about you.
          </p>
        </div>

        <Button
          onClick={GenrateAiSummary}
          disabled={loading || !!insight || !hasEnoughFeedback}
          variant="outline"
          className="shrink-0 gap-2 rounded-lg border-gray-200 bg-white px-4"
        >
          {loading ? (
            <>
              <Spinner />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles size={15} className="text-blue-600" />
              <span>AI Summary</span>
            </>
          )}
        </Button>
      </div>

      {/* Insight content */}
      <div className="mt-6">
        {insight ? (
          <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            {/* Small accent */}
            <div className="absolute left-0 top-0 h-full w-1 bg-blue-500" />

            {/* Insight heading */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-blue-600">
                  AI Analysis
                </p>

                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  {insight?.title}
                </h3>
              </div>

              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 sm:flex">
                <Lightbulb
                  size={20}
                  className="text-blue-600"
                  strokeWidth={1.8}
                />
              </div>
            </div>

            {/* Summaries */}
            <div className="mt-5 space-y-3">
              {insight?.summarized_feedback?.map((summary, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 rounded-lg bg-gray-50 p-3"
                >
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-blue-600 shadow-sm">
                    {idx + 1}
                  </div>

                  <p className="text-sm leading-6 text-gray-600">
                    {summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 px-5 py-8 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
              <MessageSquareText
                size={18}
                className="text-gray-400"
              />
            </div>

            <h3 className="mt-3 text-sm font-medium text-gray-800">
              Need at least 3 feedbacks to generate insights.
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-gray-400">
              {hasEnoughFeedback
                ? "Generate an AI summary to discover useful patterns in your feedback."
                : `You need at least 3 messages to generate insights. You currently have ${feedbackCount}.`}
            </p>

            {!hasEnoughFeedback && (
              <div className="mx-auto mt-4 h-1.5 max-w-45 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{
                    width: `${Math.min((feedbackCount / 3) * 100, 100)}%`,
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AiSummary;

