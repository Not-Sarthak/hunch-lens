import { Grid, RefreshCw } from "lucide-react";
import { useFormStore } from "src/store/use-form-store";
import { StrategyType } from "src/types";

const StepTwo = () => {
  const { selectedStrategies, compoundProfits, setField } = useFormStore();

  const strategies: StrategyType[][] = [["Maker", "Scout", "Bull", "Bear"]];

  const handleStrategyClick = (strategy: StrategyType) => {
    const newStrategies = selectedStrategies.includes(strategy)
      ? selectedStrategies.filter((s) => s !== strategy)
      : [...selectedStrategies, strategy];
    setField("selectedStrategies", newStrategies);
  };

  return (
    <div className="w-full bg-[#111015] border-[#1e1e21] border-[1px] rounded-lg p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2 text-gray-200">
            What casts do you want to hit?
          </label>
          <div className="grid grid-cols-4 gap-4">
            {strategies.map((row, rowIndex) => (
              <div key={rowIndex} className="contents">
                {row.map((strategy, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className={`p-4 rounded-lg transition-colors ${
                      selectedStrategies.includes(strategy)
                    ? "bg-[#6FDBB54D]/30 border-[1px] border-[#45A176] text-white"
                    : "bg-[#242424] text-[#737373]"
                    }`}
                    onClick={() => handleStrategyClick(strategy)}
                  >
                    {strategy}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium flex items-center gap-2 text-gray-200">
            Would you like compounded profits?
          </span>
          <button
            className={`w-12 h-6 rounded-full transition-colors ${
              compoundProfits ? "bg-[#6FDBB5]" : "bg-gray-600"
            } relative`}
            onClick={() => setField("compoundProfits", !compoundProfits)}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                compoundProfits ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
