"use client";

import { memo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { TriangleAlert, X, Loader2 } from "lucide-react";
import { useTokenizeStore } from "src/store/use-tokenize-store";
// import { tokenizationSchema } from "src/schemas/tokenize-cast-schema";
import { z } from "zod";
import { backendUrl } from "src/constants";
import type { TokenizeFormData } from "src/types";

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
        const res = await axios.get(`${backendUrl}/preview`, {
          params: { url },
        });
        setPreviewData(res.data);
      } catch (err) {
        console.error("Preview error:", err);
        setError("Failed to fetch preview data");
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
            src={previewData.images[0]}
            alt="Attached media"
            className="object-cover w-full h-48 rounded-lg"
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

// Explicit schema in case the imported one is incorrect
const tokenizationSchema = z.object({
  tweetUrl: z.string().url("Please enter a valid URL"),
  marketName: z.string().optional(),
  initialSupply: z.number().optional(),
  price: z.number().optional()
});

const TokenizeCastForm = memo(({ closeModal }: { closeModal: () => void }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<TokenizeFormData>({
    resolver: zodResolver(tokenizationSchema),
    defaultValues: {
      tweetUrl: ""
    }
  });

  const onSubmit = async (data: TokenizeFormData) => {
    console.log("Form submitted with data:", data);
    
    try {
      console.log("Sending request to:", `${backendUrl}/tokenization/create-market`);
      const response = await axios.post(`${backendUrl}/tokenization/create-market`, {
        url: data.tweetUrl,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Server response:", response.data);
      toast.success("Tweet tokenized successfully!");
      closeModal();
    } catch (error) {
      console.error("Full error details:", error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(`Server error: ${error.response.data.message || 'Failed to tokenize tweet'}`);
        } else if (error.request) {
          toast.error("No response from server. Please check your network connection.");
        } else {
          toast.error("Error setting up the request. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-medium text-neutral-50">Tokenize a Cast / Tweet</h2>
        <button onClick={closeModal} className="text-white hover:text-red-400">
          <X className="w-6 h-6" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="tweetUrl"
            className="block text-neutral-50 text-sm mb-1"
          >
            Farcaster / Tweet URL
          </label>
          <input
            id="tweetUrl"
            {...register("tweetUrl")}
            placeholder="https://warpcast.com/robertfelt.eth/0xfd5f7fd7"
            className="px-3.5 py-3 bg-[#242424] w-full rounded-md text-neutral-100 placeholder-neutral-500 text-sm"
          />
          {errors.tweetUrl && (
            <p className="mt-2 text-sm text-red-400">{errors.tweetUrl.message}</p>
          )}
        </div>
        <SocialPreview url={watch("tweetUrl")} />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 bg-white text-[#111015] rounded-lg font-normal btn disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Tokenizing...
            </div>
          ) : (
            "Create Market"
          )}
        </button>
      </form>
    </div>
  );
});

TokenizeCastForm.displayName = "TokenizeCastForm";

export default TokenizeCastForm;