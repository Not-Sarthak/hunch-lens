"use client";

import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { aiAgentSchema } from "src/schemas/ai-agent-schema";
import { useFormStore } from "src/store/use-form-store";
import type { AIAgentFormData, AIFormStore } from "src/types";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface CreateAIFormProps {
 onClose: () => void;
}

interface RenderBasicInfoProps {
 values: AIAgentFormData & { selectedTopics: string[] };
 actions: AIFormStore['actions'];
 errors: FieldErrors<AIAgentFormData>;
 register: UseFormRegister<AIAgentFormData>;
}

interface RenderTopicsProps {
 values: AIAgentFormData & { selectedTopics: string[] };
 actions: AIFormStore['actions'];
}

interface RenderWalletProps {
 values: AIAgentFormData & { selectedTopics: string[] };
 actions: AIFormStore['actions'];
}

const TRENDING_TOPICS = [
 "AI & ML", "Web3", "DeFi", "NFTs", "Gaming",
 "Metaverse", "DAOs", "Privacy", "Layer 2", "ZK"
];

const ProgressBar = ({ step }: { step: number }) => {
 const progress = (step / 3) * 100;

 return (
   <div className="w-full h-2 bg-cardGray-900 rounded-full overflow-hidden">
     <div 
       className="h-full bg-accentPurple transition-all duration-300 ease-in-out"
       style={{ width: `${progress}%` }}
     />
   </div>
 );
};

const RenderBasicInfo = ({ values, actions, errors, register }: RenderBasicInfoProps) => {
 const handleCustomInput = (field: "activityLevel" | "riskLevel", value: string) => {
   const numValue = parseInt(value);
   if (!isNaN(numValue) && numValue >= 1 && numValue <= 10) {
     actions.setField(field, numValue);
   }
 };

 return (
   <div className="space-y-4">
     <div>
       <label className="block text-sm font-medium text-white mb-1">Name</label>
       <input
         {...register("name")}
         className="w-full p-2 rounded-md bg-cardGray-900 border border-white/10 
         text-white focus:outline-none focus:ring-2 focus:ring-accentPurple"
         placeholder="Enter agent name"
       />
       {errors.name && (
         <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
       )}
     </div>

     <div>
       <label className="block text-sm font-medium text-white mb-1">Objective</label>
       <div className="space-y-2">
         {["Profit", "Value", "Diversify"].map((obj) => (
           <label key={obj} className="flex items-center space-x-2">
             <input
               type="radio"
               {...register("objective")}
               value={obj}
               className="text-accentPurple focus:ring-accentPurple"
             />
             <span className="text-white">{obj}</span>
           </label>
         ))}
       </div>
     </div>

     <div>
       <label className="block text-sm font-medium text-white mb-1">
         Trading Activity Level
       </label>
       <div className="space-y-2">
         {["Frequent", "Moderate", "Rare"].map((level) => (
           <label key={level} className="flex items-center space-x-2">
             <input
               type="radio"
               {...register("activityLevel")}
               value={level}
               className="text-accentPurple focus:ring-accentPurple"
             />
             <span className="text-white">{level}</span>
           </label>
         ))}
         <div className="flex items-center space-x-2">
           <input
             type="radio"
             {...register("activityLevel")}
             value="custom"
             className="text-accentPurple focus:ring-accentPurple"
           />
           <input
             type="number"
             min="1"
             max="10"
             placeholder="1-10"
             onChange={(e) => handleCustomInput("activityLevel", e.target.value)}
             className="w-20 p-1 rounded bg-cardGray-900 border border-white/10 
             text-white focus:outline-none focus:ring-2 focus:ring-accentPurple"
           />
         </div>
       </div>
     </div>

     <div>
       <label className="block text-sm font-medium text-white mb-1">
         Risk Level
       </label>
       <div className="space-y-2">
         {["Aggressive", "Medium", "Conservative"].map((level) => (
           <label key={level} className="flex items-center space-x-2">
             <input
               type="radio"
               {...register("riskLevel")}
               value={level}
               className="text-accentPurple focus:ring-accentPurple"
             />
             <span className="text-white">{level}</span>
           </label>
         ))}
         <div className="flex items-center space-x-2">
           <input
             type="radio"
             {...register("riskLevel")}
             value="custom"
             className="text-accentPurple focus:ring-accentPurple"
           />
           <input
             type="number"
             min="1"
             max="10"
             placeholder="1-10"
             onChange={(e) => handleCustomInput("riskLevel", e.target.value)}
             className="w-20 p-1 rounded bg-cardGray-900 border border-white/10 
             text-white focus:outline-none focus:ring-2 focus:ring-accentPurple"
           />
         </div>
       </div>
     </div>

     <div>
       <label className="flex items-center space-x-2 cursor-pointer">
         <input
           type="checkbox"
           {...register("reinvestProfits")}
           className="rounded border-white/10 bg-cardGray-900 text-accentPurple 
           focus:ring-2 focus:ring-accentPurple"
         />
         <span className="text-white text-sm">Reinvest Profits</span>
       </label>
     </div>
   </div>
 );
};

const RenderTopics = ({ values, actions }: RenderTopicsProps) => {
 return (
   <div className="space-y-4">
     <h3 className="text-lg font-medium text-white">Select Trending Topics</h3>
     <div className="grid grid-cols-2 gap-2">
       {TRENDING_TOPICS.map((topic) => {
         const isSelected = values.selectedTopics.includes(topic);
         return (
           <button
             key={topic}
             type="button"
             onClick={() => {
               const newTopics = isSelected
                 ? values.selectedTopics.filter((t) => t !== topic)
                 : [...values.selectedTopics, topic];
               actions.setField("selectedTopics", newTopics);
             }}
             className={`
               px-4 py-2 rounded-md text-sm font-medium
               transition-all duration-200 ease-in-out
               ${isSelected 
                 ? 'bg-accentPurple text-white border-2 border-accentPurple' 
                 : 'bg-cardGray-900 text-white/70 border-2 border-white/10 hover:border-white/30'
               }
             `}
           >
             {topic}
           </button>
         );
       })}
     </div>
   </div>
 );
};

const RenderWallet = ({ values, actions }: RenderWalletProps) => {
 const generateWallet = async () => {
   try {
     // Simulate wallet generation
     await new Promise((resolve) => setTimeout(resolve, 1000));
     actions.setField("walletAddress", "0x1234...5678");
     actions.setField("hasGeneratedWallet", true);
     toast.success("Wallet generated successfully!");
   } catch (error) {
     toast.error("Failed to generate wallet");
   }
 };

 const checkFunds = async () => {
   try {
     // Simulate funds check
     await new Promise((resolve) => setTimeout(resolve, 1000));
     actions.setField("hasFunds", true);
     toast.success("Funds detected!");
   } catch (error) {
     toast.error("No funds detected");
   }
 };

 return (
   <div className="space-y-4">
     <h3 className="text-lg font-medium text-white">Wallet Setup</h3>
     
     {!values.hasGeneratedWallet ? (
       <button
         onClick={generateWallet}
         type="button"
         className="w-full btn btn-indigo"
       >
         Generate Wallet
       </button>
     ) : (
       <div className="space-y-2">
         <p className="text-white">
           Wallet Address: {values.walletAddress}
         </p>
         <p className="text-sm text-gray-400">
           Transfer funds to this address to continue
         </p>
         <button
           onClick={checkFunds}
           type="button"
           className="w-full btn btn-indigo"
         >
           Check Funds
         </button>
       </div>
     )}
   </div>
 );
};

const CreateAIForm = memo(({ onClose }: CreateAIFormProps) => {
 const { step, values, actions } = useFormStore();

 const {
   register,
   handleSubmit,
   formState: { errors },
 } = useForm<AIAgentFormData>({
   resolver: zodResolver(aiAgentSchema),
   defaultValues: values,
 });

 const onSubmit = async (data: AIAgentFormData) => {
   try {
     console.log("Final Form Data:", data);
     await new Promise((resolve) => setTimeout(resolve, 1000));
     actions.reset();
     toast.success("AI Agent created successfully!");
     onClose();
   } catch (error) {
     console.error("Form submission error:", error);
     toast.error("Failed to create AI Agent");
   }
 };

 const renderStepContent = useCallback(() => {
   switch (step) {
     case 1:
       return (
         <RenderBasicInfo
           values={values}
           actions={actions}
           errors={errors}
           register={register}
         />
       );
     case 2:
       return <RenderTopics values={values} actions={actions} />;
     case 3:
       return <RenderWallet values={values} actions={actions} />;
     default:
       return null;
   }
 }, [step, values, actions, errors, register]);

 return (
   <form
     onSubmit={handleSubmit(onSubmit)}
     className="space-y-6 p-6 bg-cardGray-800 rounded-lg shadow-custom"
   >
     <div className="space-y-4">
       <div className="flex justify-between items-center">
         <h2 className="text-xl font-bold text-white">
           {step === 1 && "Basic Information"}
           {step === 2 && "Select Topics"}
           {step === 3 && "Wallet Setup"}
         </h2>
         <div className="text-sm text-gray-400">
           Step {step} of 3
         </div>
       </div>
       
       <ProgressBar step={step} />
     </div>

     {renderStepContent()}

     <div className="flex justify-between pt-4">
       {step > 1 && (
         <button
           type="button"
           onClick={actions.prevStep}
           className="btn btn-indigo"
         >
           Previous
         </button>
       )}
       {step < 3 && (
         <button
           type="button"
           onClick={actions.nextStep}
           className="btn btn-indigo ml-auto"
         >
           Next
         </button>
       )}
       {step === 3 && values.hasFunds && (
         <button type="submit" className="btn btn-indigo ml-auto">
           Launch AI Agent
         </button>
       )}
     </div>
   </form>
 );
});

CreateAIForm.displayName = "CreateAIForm";

export default CreateAIForm;