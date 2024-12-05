import { Bot, Target, BadgePercent } from 'lucide-react';
import { useFormStore } from 'src/store/use-form-store';
import { GoalType } from 'src/types';

const StepOne = () => {
  const { name, goal, riskTolerance, setField } = useFormStore();

  const goals: GoalType[] = ['profit', 'values', 'social'];
  const goalLabels = {
    profit: 'Only Profit',
    values: 'I value values',
    social: 'Socialistic - combo'
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2 text-gray-200">
            <Bot className="w-4 h-4" />
            Give it a name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setField('name', e.target.value)}
            placeholder="Enter name"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2 text-gray-200">
            <Target className="w-4 h-4" />
            What's your goal?
          </label>
          <div className="grid grid-cols-3 gap-4">
            {goals.map((goalType) => (
              <button
                key={goalType}
                className={`p-4 rounded-lg transition-colors ${
                  goal === goalType ? 'bg-green-700 text-white' : 'bg-gray-700 text-gray-200'
                }`}
                onClick={() => setField('goal', goalType)}
              >
                {goalLabels[goalType]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2 text-gray-200">
            <BadgePercent className="w-4 h-4" />
            What's your risk tolerance?
          </label>
          <div className="relative pt-8 px-2">
            {/* Value indicator */}
            <div 
              className="absolute -top-2 flex items-center justify-center text-xl text-green-400"
              style={{ 
                left: `${(riskTolerance / 10) * 100}%`,
                transform: 'translateX(-50%)'
              }}
            >
              {riskTolerance}
            </div>

            {/* Slider track container */}
            <div className="relative h-1">
              {/* Background track */}
              <div className="absolute w-full h-full bg-gray-800 rounded-full" />
              
              {/* Colored progress */}
              <div 
                className="absolute h-full bg-green-400 rounded-full transition-all duration-150"
                style={{ width: `${(riskTolerance / 10) * 100}%` }}
              />

              {/* Thumb */}
              <div 
                className="absolute w-4 h-4 bg-gray-900 border-2 border-green-400 rounded-full -mt-1.5 transition-all duration-150"
                style={{ 
                  left: `${(riskTolerance / 10) * 100}%`,
                  transform: 'translateX(-50%)'
                }}
              />

              {/* Hidden range input */}
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={riskTolerance}
                onChange={(e) => setField('riskTolerance', Number(e.target.value))}
                className="absolute w-full h-8 opacity-0 cursor-pointer -mt-3"
              />
            </div>

            {/* Min/max labels */}
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