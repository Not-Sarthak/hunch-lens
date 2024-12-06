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

const formatAddress = (address: string | undefined): string => {
  if (!address) return "";
  const start = address.slice(0, 4);
  const end = address.slice(-4);
  return `${start}...${end}`;
};

const ShimmerUI = () => (
  <div className="space-y-6 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="w-32 h-4 rounded bg-neutral-800"></div>
        <div className="w-64 h-8 rounded bg-neutral-800"></div>
      </div>
      <div className="w-40 h-10 rounded bg-neutral-800"></div>
    </div>
    <div className="w-full h-2 rounded-full bg-neutral-800"></div>
    <div className="space-y-4">
      <div className="w-full h-12 rounded bg-neutral-800"></div>
      <div className="w-3/4 h-12 rounded bg-neutral-800"></div>
      <div className="w-1/2 h-12 rounded bg-neutral-800"></div>
    </div>
    <div className="flex items-center justify-between">
      <div className="w-16 h-6 rounded bg-neutral-800"></div>
      <div className="flex gap-4">
        <div className="w-24 h-10 rounded bg-neutral-800"></div>
        <div className="w-24 h-10 rounded bg-neutral-800"></div>
      </div>
    </div>
  </div>
);

const LaunchAI = () => {
  const router = useRouter();
  const { address } = useAccount();

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

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <ShimmerUI />
      </div>
    );
  }

  return (
    <div className="min-w-[50vw]">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-neutral-500 text-sm font-normal font-helvetica leading-[16.80px] mb-4">
              Set up your intel agent
            </div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-light leading-normal text-white capitalize font-helvetica">
                {formatAddress(address)}{" "}
              </div>

              <div className="bg-gradient-to-b from-[#6FDBB5] to-[#45A176] inline-block text-transparent bg-clip-text font-normal tracking-tight text-[44px] leading-[44px]">
                / $0.01 ETH
              </div>
            </div>
          </div>
          <div>
            <button className="text-neutral-500 hover:scale-95 transition-all flex items-center gap-2 bg-gradient-to-b from-[#26262A] to-[#16151A] px-2 py-2 rounded-lg border-[1px] border-[#1E1E21] text-sm font-normal font-helvetica">
              <Image src="/icons/ai.svg" alt="ai" width={20} height={20} />
              Randomise answers
            </button>
          </div>
        </div>

        <div>{renderStep()}</div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 pb-1">
            <span className="text-sm text-gray-400">{step}/3</span>
          </div>

          <div className="flex items-center gap-4">
            {step > 1 && (
              <button
                className="flex items-center gap-2 px-4 py-2 text-black transition-all bg-white rounded-lg hover:scale-95"
                onClick={() => setStep((step - 1) as FormStep)}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
            )}
            {step !== 3 ? (
              <button
                className="flex items-center gap-2 px-4 py-2 text-black transition-all bg-white rounded-lg hover:scale-95"
                onClick={() => goNext((step + 1) as FormStep)}
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleLaunch}
                className="flex items-center gap-2 px-4 py-2 text-black transition-all bg-white rounded-lg hover:scale-95"
              >
                🚀 Launch AI Agent
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchAI;
