import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Hash, Rocket } from "lucide-react";
import { toast } from "sonner";
import { useFormStore } from "src/store/use-form-store";
import StepOne from "./step-one";
import StepTwo from "./step-two";
import StepThree from "./step-three";
import { FormStep } from "src/types";
import { useAccount } from "wagmi";
import Image from "next/image";

const LaunchAI = () => {
  const router = useRouter();

  const {
    step,
    setStep,
    name,
    goal,
    riskTolerance,
    selectedStrategies,
    compoundProfits,
    walletId,
  } = useFormStore();
  const [isLoading, setIsLoading] = useState(false);

  const goNext = (nextStep: FormStep) => {
    setIsLoading(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsLoading(false);
    }, 500);
  };

  const handleLaunch = () => {
    setIsLoading(true);

    const formData = {
      name,
      goal,
      riskTolerance,
      selectedStrategies,
      compoundProfits,
      walletId: "0x23...2124",
    };

    console.log("Launching AI Agent with configuration:", formData);

    setTimeout(() => {
      toast.success("AI Agent launched successfully!");
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  const formatAddress = (address: string | undefined): string => {
    if (!address) return "";

    // Return first 4 and last 4 characters with ... in between
    const start = address.slice(0, 4);
    const end = address.slice(-4);
    return `${start}...${end}`;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return <StepOne />;
    }
  };

  const { address } = useAccount();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="">
            <div className="text-neutral-500 text-sm font-normal font-inter leading-[16.80px]">
              Set up your intel agent
            </div>
            <div className="flex items-center gap-2">
              <div className="text-white text-2xl font-light font-['Helvetica Neue'] capitalize leading-normal">
                {formatAddress(address)}{" "}
              </div>
              <div className="bg-gradient-to-r from-[#6FDBB5] to-[#5BC49E] inline-block text-transparent bg-clip-text text-[44px] leading-[44px]">
                / $0.01 ETH
              </div>
            </div>
          </div>
          <div>
            <button className="text-neutral-500 flex items-center gap-2 bg-gradient-to-b from-[#26262A] to-[#16151A] px-2 py-2 rounded-lg border-[1px] border-[#1E1E21] text-sm font-normal font-['Helvetica Neue'] leading-[16.80px]">
              <Image src="/icons/ai.svg" alt="ai" width={20} height={20} />
              Randomise answers
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-gray-400" />
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-400">{step}/3</span>
        </div>

        <div
          className={`transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}
        >
          {renderStep()}
        </div>

        {step !== 3 && (
          <div className="flex justify-between">
            {step > 1 && (
              <button
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                onClick={() => setStep((step - 1) as FormStep)}
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
            )}
            <button
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 ml-auto"
              onClick={() => goNext((step + 1) as FormStep)}
              disabled={isLoading}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6">
            <button
              onClick={handleLaunch}
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Launch AI Agent
            </button>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
        </div>
      )}
    </div>
  );
};

export default LaunchAI;
