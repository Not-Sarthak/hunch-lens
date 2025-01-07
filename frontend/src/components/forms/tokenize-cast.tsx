"use client";

import { memo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";
import { z } from "zod";
import { client } from "src/graphql/client";
import getPostFromId from "src/graphql/getPostFromId";
import getPostMetadata from "src/utils/getPostMetadata";

interface PreviewData {
  name?: string;
  username?: string;
  content?: string;
  stats?: {
    totalAmountOfCollects?: number;
    totalAmountOfMirrors?: number;
    totalAmountOfComments?: number;
  };
  createdAt?: string;
  profile?: {
    picture?: {
      uri?: string;
      original?: {
        url?: string;
      };
    };
    handle?: string;
    name?: string;
  };
  metadata?: {
    media?: Array<{
      url?: string;
    }>;
  };
}

interface TokenizeFormData {
  tweetUrl: string;
  marketName?: string;
  initialSupply?: number;
  price?: number;
}

const SocialPreview = ({ url }: { url: string }) => {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreviewData = async () => {
      if (!url) return;
      
      const match = url.match(/hey\.xyz\/posts\/([^\/]+)/);
      if (!match) return;
      
      const postId = match[1];
      setLoading(true);
      setError(null);

      try {
        const result = await getPostMetadata(postId);
        console.log("Got post data:", result);
        setPreviewData(result.data?.publication);
      } catch (err) {
        console.error("Preview error:", err);
        setError("Failed to fetch post data");
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

  const profilePicture = previewData.profile?.picture?.uri || 
                        previewData.profile?.picture?.original?.url;

  return (
    <div className="p-4 space-y-3 rounded-lg border border-[#1E1E21]">
      <div className="flex items-center gap-3">
        {profilePicture && (
          <img
            src={profilePicture}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-medium truncate text-neutral-100">
                {previewData.profile?.name || previewData.profile?.handle}
              </span>
              <p className="text-sm text-[#787878]">
                @{previewData.profile?.handle}
              </p>
            </div>
            <p className="text-xs text-[#787878]">
              {new Date(previewData.createdAt || "").toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <p className="mt-1 text-sm font-normal text-white">
        {previewData.content}
      </p>
      {previewData.metadata?.media && previewData.metadata.media.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-3">
          <img
            src={previewData.metadata.media[0].url}
            alt="Attached media"
            className="object-cover w-full h-48 rounded-lg"
          />
        </div>
      )}
      <div className="flex items-center gap-4 text-sm text-neutral-400">
        <span>{previewData.stats?.totalAmountOfCollects || 0} collects</span>
        <span>{previewData.stats?.totalAmountOfMirrors || 0} mirrors</span>
        <span>{previewData.stats?.totalAmountOfComments || 0} comments</span>
      </div>
    </div>
  );
};

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
      // You can implement the tokenization logic here
      toast.success("Post tokenized successfully!");
      closeModal();
    } catch (error) {
      console.error("Error in tokenization:", error);
      toast.error("Failed to tokenize post. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-medium text-neutral-50">Tokenize a Post</h2>
        <button 
          onClick={closeModal} 
          className="text-white hover:text-red-400"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="tweetUrl"
            className="block text-neutral-50 text-sm mb-1"
          >
            Lens Post URL
          </label>
          <input
            id="tweetUrl"
            type="url"
            {...register("tweetUrl")}
            placeholder="https://hey.xyz/posts/..."
            className="px-3.5 py-3 bg-[#242424] w-full rounded-md text-neutral-100 placeholder-neutral-500 text-sm"
            autoComplete="off"
          />
          {errors.tweetUrl && (
            <p className="mt-2 text-sm text-red-400">{errors.tweetUrl.message}</p>
          )}
        </div>
        
        <SocialPreview url={watch("tweetUrl")} />
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 bg-white text-[#111015] rounded-lg font-normal py-2 px-4 btn disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
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

export default TokenizeCastForm;