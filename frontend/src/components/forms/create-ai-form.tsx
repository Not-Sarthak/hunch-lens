"use client";

import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { aiAgentSchema } from "src/schemas/ai-agent-schema";
import { useFormStore } from "src/store/use-form-store";
import type { AIAgentFormData } from "src/types";

interface CreateAIFormProps {
 onClose: () => void;
}

const selectOptions = {
 objective: ["Profit", "Value", "Diversify"],
 activityLevel: ["Frequent", "Moderate", "Rare"],
 riskLevel: ["Aggressive", "Medium", "Conservative"],
} as const;

const CreateAIForm = memo(({ onClose }: CreateAIFormProps) => {
 const { values, actions } = useFormStore();

 const {
   register,
   handleSubmit,
   formState: { errors, isSubmitting },
 } = useForm<AIAgentFormData>({
   resolver: zodResolver(aiAgentSchema),
   defaultValues: values,
 });

 const onSubmit = async (data: AIAgentFormData) => {
   try {
     // Simulate contract call
     await new Promise((resolve) => setTimeout(resolve, 1000));
     console.log("AI Agent Data:", data);
     actions.reset();
     toast.success("AI Agent created successfully!");
     onClose();
   } catch (error) {
     console.error("Form submission error:", error);
     toast.error("Failed to create AI Agent");
   }
 };

 const renderSelect = (
   field: keyof typeof selectOptions,
   label: string
 ) => (
   <div className="space-y-1">
     <label htmlFor={field} className="block text-sm font-medium text-white">
       {label}
     </label>
     <select
       id={field}
       {...register(field)}
       onChange={(e) => actions.setField(field, e.target.value)}
       value={values[field]}
       className="w-full p-2 rounded-md bg-cardGray-900 border border-white/10 
       text-white focus:outline-none focus:ring-2 focus:ring-accentPurple"
     >
       <option value="">Select {label}</option>
       {selectOptions[field].map((option) => (
         <option key={option} value={option}>
           {option}
         </option>
       ))}
     </select>
     {errors[field] && (
       <p className="text-sm text-red-400">{errors[field]?.message}</p>
     )}
   </div>
 );

 return (
   <form
     onSubmit={handleSubmit(onSubmit)}
     className="space-y-4 p-6 bg-cardGray-800 rounded-lg shadow-custom"
   >
     <div className="space-y-1">
       <label htmlFor="name" className="block text-sm font-medium text-white">
         Name
       </label>
       <input
         id="name"
         {...register("name")}
         onChange={(e) => actions.setField("name", e.target.value)}
         value={values.name}
         className="w-full p-2 rounded-md bg-cardGray-900 border border-white/10 
         text-white focus:outline-none focus:ring-2 focus:ring-accentPurple"
         placeholder="Enter agent name"
       />
       {errors.name && (
         <p className="text-sm text-red-400">{errors.name.message}</p>
       )}
     </div>

     {renderSelect("objective", "Objective")}
     {renderSelect("activityLevel", "Trading Activity Level")}
     {renderSelect("riskLevel", "Risk Level")}

     <div className="pt-2">
       <label className="flex items-center space-x-2 cursor-pointer">
         <input
           type="checkbox"
           {...register("reinvestProfits")}
           onChange={(e) => actions.setField("reinvestProfits", e.target.checked)}
           checked={values.reinvestProfits}
           className="rounded border-white/10 bg-cardGray-900 text-accentPurple 
           focus:ring-2 focus:ring-accentPurple"
         />
         <span className="text-white text-sm">Reinvest Profits</span>
       </label>
     </div>

     <button
       type="submit"
       disabled={isSubmitting}
       className="w-full btn btn-indigo"
     >
       {isSubmitting ? "Creating..." : "Launch AI Agent"}
     </button>
   </form>
 );
});

CreateAIForm.displayName = "CreateAIForm";

export default CreateAIForm;