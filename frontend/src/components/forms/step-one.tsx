import { Bot, Target, BadgePercent } from "lucide-react";
import { useFormStore } from "src/store/use-form-store";
import { GoalType, AIType, AIGoalType } from "src/types";

const StepOne = () => {
  const { name, basename, goal, aiType, aiGoal, riskTolerance, setField } = useFormStore();

  const aiTypes: AIType[] = ["default", "custom"];
  const aiGoals: Record<AIGoalType, string> = {
    aggressive: "Aggressive",
    conservative: "Conservative",
    moderate: "Moderate",
  };

  const goals: Record<GoalType, string> = {
    profit: "Growth",
    values: "Balance",
    social: "Impact"
  };

  return (
    <div className="w-full bg-[#111015] border-[1px] border-[#1e1e21] rounded-lg p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-neutral-50 block text-sm font-normal font-inter leading-[18.20px]">
            Name your AI Agent
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Enter name"
            className="h-[41px] px-3.5 py-3 bg-[#242424] w-full rounded-md justify-start items-center gap-1 inline-flex text-neutral-500 text-sm font-normal font-inter leading-[16.80px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-neutral-50 block text-sm font-normal font-inter leading-[18.20px]">
            Make your Agent Based 💙
          </label>
          <input
            type="text"
            value={basename}
            onChange={(e) => setField("basename", e.target.value)}
            placeholder="Enter basename"
            className="h-[41px] px-3.5 py-3 bg-[#242424] w-full rounded-md justify-start items-center gap-1 inline-flex text-neutral-500 text-sm font-normal font-inter leading-[16.80px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm flex items-center gap-2 text-gray-200">
            Select AI Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            {aiTypes.map((type) => (
              <button
                key={type}
                className={`p-4 rounded-lg transition-colors ${
                  aiType === type
                    ? "bg-[#6FDBB54D]/30 border-[1px] border-[#45A176] text-white"
                    : "bg-[#242424] text-[#737373]"
                }`}
                onClick={() => setField("aiType", type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {aiType === "custom" && (
          <div className="space-y-2">
            <label className="text-sm flex items-center gap-2 text-gray-200">
              Select AI Goal
            </label>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(aiGoals).map(([key, value]) => (
                <button
                  key={key}
                  className={`p-4 rounded-lg transition-colors ${
                    aiGoal === key
                      ? "bg-[#6FDBB54D]/30 border-[1px] border-[#45A176] text-white"
                      : "bg-[#242424] text-[#737373]"
                  }`}
                  onClick={() => setField("aiGoal", key as AIGoalType)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm flex items-center gap-2 text-gray-200">
            Pick AI mission goal
          </label>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(goals).map(([key, value]) => (
              <button
                key={key}
                className={`p-4 rounded-lg transition-colors ${
                  goal === key
                    ? "bg-[#6FDBB54D]/30 border-[1px] border-[#45A176] text-white"
                    : "bg-[#242424] text-[#737373]"
                }`}
                onClick={() => setField("goal", key as GoalType)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2 text-gray-200">
            <BadgePercent className="w-4 h-4" />
            Set risk level
          </label>
          <div className="relative pt-6">
            <div
              className="absolute -top-2 flex items-center justify-center text-xl text-[#6FDBB5]"
              style={{
                left: `${(riskTolerance / 10) * 100}%`,
                transform: "translateX(-50%)",
              }}
            >
              {riskTolerance}
            </div>
            <div className="relative h-1">
              <div className="absolute w-full h-full bg-gray-800 rounded-xl" />
              <div
                className="absolute h-full bg-gradient-to-r from-[#6FDBB5] via-[#6FDBB5] to-[#242424] rounded-full transition-all duration-150"
                style={{ width: `${(riskTolerance / 10) * 100}%` }}
              />
              <div
                className="absolute w-4 h-4 bg-gray-900 border-2 border-[#6FDBB5] rounded-md -mt-1.5 transition-all duration-150"
                style={{
                  left: `${(riskTolerance / 10) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              />
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={riskTolerance}
                onChange={(e) => setField("riskTolerance", Number(e.target.value))}
                className="absolute w-full h-8 opacity-0 cursor-pointer -mt-3"
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-500 text-sm">0</span>
              <span className="text-gray-500 text-sm">10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;