import { CheckCheck } from 'lucide-react';
import { toast } from 'sonner';

const StepThree = () => {
  return (
    <div className="w-full bg-gray-900 rounded-lg p-6">
      <div className="space-y-6 text-center">
        <div className="text-green-500">
          <CheckCheck className="w-16 h-16 mx-auto" />
        </div>
        
        <div>
          <p className="text-xl text-gray-200">Yay! Wallet generated</p>
          <p className="text-sm text-gray-400 mt-2">0x23...2124</p>
        </div>

        <button
          onClick={() => toast.success('Funds check initiated!')}
          className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          Check Funds
        </button>
      </div>
    </div>
  );
};

export default StepThree;