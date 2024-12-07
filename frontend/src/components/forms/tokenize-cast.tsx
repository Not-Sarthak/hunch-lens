"use client";

import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { TokenizeFormData } from "src/types";
import { useTokenizeStore } from "src/store/use-tokenize-store";
import { tokenizationSchema } from "src/schemas/tokenize-cast-schema";
import { TriangleAlert, X } from "lucide-react";

const formFields = [
  {
    id: "tweetUrl",
    label: "Farcaster / Tweet URL",
    placeholder: "https://warpcast.com/jessepollak/0x4dde1942",
    type: "text",
  },
] as const;

const TokenizeCastForm = memo(({ closeModal }: { closeModal: () => void }) => {
  const { values, actions } = useTokenizeStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TokenizeFormData>({
    resolver: zodResolver(tokenizationSchema),
    defaultValues: {
      tweetUrl: values.tweetUrl,
      marketName: values.marketName,
      initialSupply: values.initialSupply,
      price: values.price,
    },
  });

  const onSubmit = async (data: TokenizeFormData) => {
    actions.setIsSubmitting(true);
    try {
      console.log("Form Submission Data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Tweet tokenized successfully!");
      actions.resetForm();
      closeModal();
    } catch (error) {
      toast.error("Failed to tokenize tweet. Please try again.");
      console.error(error);
    } finally {
      actions.setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="text-neutral-50 text-base font-medium font-helvetica leading-tight">
          Tokenize a Cast / Tweet
        </div>
        <button onClick={closeModal} className="text-white hover:text-red-400">
          <X className="w-6 h-6" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {formFields.map(({ id, label, placeholder, type }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-neutral-50 text-sm font-normal font-helvetica leading-[18.20px] mb-1"
            >
              {label}
            </label>
            <input
              id={id}
              type={type}
              {...register(id as keyof TokenizeFormData, {
                valueAsNumber: type === "text",
              })}
              placeholder={placeholder}
              className="px-3.5 py-3 bg-[#242424] w-full rounded-md justify-start items-center gap-1 inline-flex text-neutral-100 placeholder-neutral-500 text-sm font-normal font-helvetica"
            />
            {errors[id as keyof TokenizeFormData] && (
              <div className="pt-2">
                <p className="px-2 py-1 flex items-center gap-2 rounded-lg border-red-600 border-[1px] text-red-400 text-sm bg-red-500/30">
                  <TriangleAlert size="16px" />
                  {errors[id as keyof TokenizeFormData]?.message}
                </p>
              </div>
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={values.isSubmitting}
          className="w-full btn btn-green mt-6"
        >
          {values.isSubmitting ? "Tokenizing..." : "Hunch It!"}
        </button>
      </form>
    </div>
  );
});

TokenizeCastForm.displayName = "TokenizeCastForm";

export default TokenizeCastForm;
