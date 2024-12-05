import { Grid, RefreshCw } from 'lucide-react';
import { useFormStore } from 'src/store/use-form-store';
import { StrategyType } from 'src/types';

const StepTwo = () => {
  const { selectedStrategies, compoundProfits, setField } = useFormStore();

  const strategies: StrategyType[][] = [
    ['Only Profit', 'I value values', 'Socialistic - combo', 'Socialistic - combo'],
    ['Only Profit', 'Only Profit', 'Only Profit', 'Socialistic - combo'],
    ['Only Profit', 'Only Profit', 'Socialistic - combo', 'Socialistic - combo']
  ];

  const handleStrategyClick = (strategy: StrategyType) => {
    const newStrategies = selectedStrategies.includes(strategy)
      ? selectedStrategies.filter((s) => s !== strategy)
      : [...selectedStrategies, strategy];
    setField('selectedStrategies', newStrategies);
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2 text-gray-200">
            <Grid className="w-4 h-4" />
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
                        ? 'bg-green-700 text-white' 
                        : 'bg-gray-700 text-gray-200'
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
            <RefreshCw className="w-4 h-4" />
            Would you like compounded profits?
          </span>
          <button
            className={`w-12 h-6 rounded-full transition-colors ${
              compoundProfits ? 'bg-green-600' : 'bg-gray-600'
            } relative`}
            onClick={() => setField('compoundProfits', !compoundProfits)}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                compoundProfits ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;