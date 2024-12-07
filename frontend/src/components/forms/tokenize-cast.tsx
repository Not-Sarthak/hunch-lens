"use client";

import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { TokenizeFormData } from "src/types";
import { useTokenizeStore } from "src/store/use-tokenize-store";
import { tokenizationSchema } from "src/schemas/tokenize-cast-schema";
import { TriangleAlert, X } from "lucide-react";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { backendUrl } from "src/constants";

interface PreviewData {
  name: string;
  username: string;
  text: string;
  likes: number;
  replies: number;
  totalInteractions: number;
  createdAt: string;
  avatar: string;
  isBlueVerified: string;
  images: string[];
  videos: string[];
  mediaUrl: string | null;
}

const SocialPreview = ({ url }: { url: string }) => {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreviewData = async () => {
      if (!url) return;
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${backendUrl}/preview?url=${encodeURIComponent(url)}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch preview");
        const data = await res.json();
        setPreviewData(data);
      } catch (err) {
        console.error("Preview error:", err);
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewData();
  }, [url]);

  if (!url) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 rounded-lg bg-neutral-800">
        <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-500 rounded-lg bg-red-500/20">
        <p className="text-sm text-red-400">Failed to load preview: {error}</p>
      </div>
    );
  }

  if (!previewData) return null;

  return (
    <div className="p-4 space-y-3 rounded-lg border border-[#1E1E21]">
      <div className="flex items-center gap-3">
        <img
          src={previewData.avatar}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-medium truncate text-neutral-100">
                {previewData.name}
              </span>
              <p className="text-sm text-[#787878]">@{previewData.username}</p>
            </div>
            <p className="text-xs text-[#787878]">{previewData.createdAt}</p>
          </div>
        </div>
      </div>
      <p
        className="mt-1 text-sm font-normal"
        dangerouslySetInnerHTML={{ __html: previewData.text }}
      />

      {previewData.images?.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-3">
          <img
            key={"image-" + previewData.images[0]}
            src={previewData.images[0]}
            alt={`Attached media ${previewData.images[0]}`}
            className="object-cover w-full h-48 rounded-lg"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = "/api/placeholder/400/320";
            }}
          />
        </div>
      )}

      <div className="flex items-center gap-4 text-sm text-neutral-400">
        <span>{previewData.likes} likes</span>
        <span>{previewData.replies} replies</span>
      </div>
    </div>
  );
};

const formFields = [
  {
    id: "tweetUrl",
    label: "Farcaster / Tweet URL",
    placeholder: "https://warpcast.com/robertfelt.eth/0xfd5f7fd7",
    type: "text",
  },
] as const;

const TokenizeCastForm = memo(({ closeModal }: { closeModal: () => void }) => {
  const { values, actions } = useTokenizeStore();

  const {
    register,
    handleSubmit,
    watch,
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
      <div className="flex items-center justify-between mb-6">
        <div className="text-base font-medium leading-tight text-neutral-50 font-helvetica">
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
              {...register(id as keyof TokenizeFormData)}
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
        <SocialPreview url={watch("tweetUrl")} />
        <button
          type="submit"
          disabled={values.isSubmitting}
          className="w-full mt-6 z-50 !bg-white !text-[#111015] !rounded-lg !font-normal btn"
          onClick={() => onSubmit(watch())}
        >
          {values.isSubmitting ? "Tokenizing..." : "Create Market"}
        </button>
      </form>
    </div>
  );
});

TokenizeCastForm.displayName = "TokenizeCastForm";

export default TokenizeCastForm;
