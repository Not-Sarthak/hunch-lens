"use client";

import { memo } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { TokenizeFormData } from "src/types";
import { useTokenizeStore } from "src/store/use-tokenize-store";
import { tokenizationSchema } from "src/schemas/tokenize-cast-schema";

const formFields = [
  { id: 'tweetUrl', label: 'Tweet URL', type: 'text' },
  { id: 'marketName', label: 'Market Name', type: 'text' },
  { id: 'initialSupply', label: 'Initial Supply', type: 'number' },
  { id: 'price', label: 'Price', type: 'number', step: 'any' }
] as const;

const TokenizeCastForm = memo(({ onClose }: { onClose: () => void }) => {
  const { values, actions } = useTokenizeStore();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TokenizeFormData>({
    resolver: zodResolver(tokenizationSchema),
    defaultValues: {
      tweetUrl: values.tweetUrl,
      marketName: values.marketName,
      initialSupply: values.initialSupply,
      price: values.price
    }
  });

  const onSubmit = async (data: TokenizeFormData) => {
    actions.setIsSubmitting(true);
    try {
      console.log('Form Submission Data:', {
        tweetUrl: data.tweetUrl,
        marketName: data.marketName,
        initialSupply: data.initialSupply,
        price: data.price,
        types: {
          initialSupply: typeof data.initialSupply,
          price: typeof data.price
        }
      });
  
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Tweet tokenized successfully!");
      actions.resetForm();
      onClose();
    } catch (error) {
      toast.error("Failed to tokenize tweet. Please try again.");
      console.error(error);
    } finally {
      actions.setIsSubmitting(false);
    }
  };
  
  const handleChange = (id: keyof TokenizeFormData, value: string) => {
    if (id === 'initialSupply' || id === 'price') {
      actions.setFieldValue(id, Number(value) || 0);
    } else {
      actions.setFieldValue(id, value);
    }
  };

  const getFieldValue = (id: keyof TokenizeFormData) => {
    const value = values[id];
    if (typeof value === 'number' && (id === 'initialSupply' || id === 'price')) {
      return value || '';
    }
    return value;
  };

  const renderField = ({ id, label, type }: typeof formFields[number]) => (
    <div key={id}>
      <label 
        htmlFor={id} 
        className="block text-sm font-semibold text-white mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register(id as keyof TokenizeFormData, {
          valueAsNumber: type === 'number'
        })}
        value={getFieldValue(id as keyof TokenizeFormData)}
        onChange={e => handleChange(id as keyof TokenizeFormData, e.target.value)}
        className="w-full p-2 rounded-md bg-cardGray-900 border border-white/10 
        text-white focus:outline-none focus:ring-2 focus:ring-accentPurple"
      />
      {errors[id as keyof TokenizeFormData] && (
        <p className="mt-1 text-red-400 text-sm">
          {errors[id as keyof TokenizeFormData]?.message}
        </p>
      )}
    </div>
  );

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6 text-white">Tokenize Tweet</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {formFields.map(renderField)}
        <button
          type="submit"
          disabled={values.isSubmitting}
          className="w-full btn btn-indigo mt-6"
        >
          {values.isSubmitting ? "Tokenizing..." : "Tokenize Tweet"}
        </button>
      </form>
    </div>
  );
});

TokenizeCastForm.displayName = 'TokenizeCastForm';

export default TokenizeCastForm;