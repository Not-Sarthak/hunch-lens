"use client";

import { memo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";
import { z } from "zod";
import getPostMetadata from "src/utils/get-post-metadata";
import Image from "next/image";
import { tokenisePost } from "../../utils/transactions";

interface PostMetadata {
  __typename: string;
  content: string;
  rawURI: string;
  title: string;
  asset?: {
    __typename: string;
    image: {
      __typename: string;
      optimized: {
        __typename: string;
        uri: string;
      };
    };
  };
}

interface PostData {
  __typename: string;
  by: {
    __typename: string;
    createdAt: string;
    handle: {
      __typename: string;
      id: string;
      linkedTo: {
        __typename: string;
        nftTokenId: string;
      };
      ownedBy: string;
    };
  };
  metadata: PostMetadata;
  stats: {
    __typename: string;
    quotes: number;
    mirrors: number;
    reactions: number;
    comments: number;
  };
}

interface TokenizeFormData {
  tweetUrl: string;
}

const SocialPreview = ({ url }: { url: string }) => {
  const [previewData, setPreviewData] = useState<PostData | null>(null);
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
        console.log("Post data from API:", result.data?.publication);
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

  const metadata = previewData.metadata;
  const username = metadata.title;
  const imageUrl = metadata.asset?.image?.optimized?.uri;

  return (
    <div className="p-4 space-y-3 rounded-lg border border-[#1E1E21]">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-medium truncate text-neutral-100">
                {username}
              </span>
              <p className="text-sm text-[#787878]">@{username}</p>
            </div>
            <p className="text-xs text-[#787878]">
              {new Date(previewData.by.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <p className="mt-1 text-sm font-normal text-white">
        {metadata.content}
      </p>
      {imageUrl && (
        <div className="flex items-center justify-center gap-2 mt-3 relative w-full h-48">
          <Image
            src={imageUrl}
            alt="Attached media"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <div className="flex items-center gap-4 text-sm text-neutral-400">
        <span>{previewData.stats.reactions || 0} reactions</span>
        <span>{previewData.stats.mirrors || 0} mirrors</span>
        <span>{previewData.stats.comments || 0} comments</span>
        <span>{previewData.stats.quotes || 0} quotes</span>
      </div>
    </div>
  );
};

const tokenizationSchema = z.object({
  tweetUrl: z.string().url("Please enter a valid URL")
});

const TokenizeCastForm = memo(({ closeModal }: { closeModal: () => void }) => {
  const [postData, setPostData] = useState<PostData | null>(null);
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
    try {
      if (!data.tweetUrl) {
        toast.error("Please enter a valid URL");
        return;
      }

      const match = data.tweetUrl.match(/hey\.xyz\/posts\/([^\/]+)/);
      if (!match) {
        toast.error("Invalid Lens post URL");
        return;
      }

      const postId = match[1];
      const result = await getPostMetadata(postId);
      const publication = result.data?.publication;
      
      if (!publication) {
        toast.error("Failed to fetch post data");
        return;
      }

      const username = publication.metadata.title.replace('Post by @', '');
      const imageUrl = publication.metadata.asset?.image?.optimized?.uri || "";
      const content = publication.metadata.content;

      console.log("Tokenising post with data:", {
        name: username,
        symbol: username.toUpperCase(),
        imageUri: imageUrl,
        text: content,
        postId
      });

      const tx = await tokenisePost({
        name: username,
        symbol: username.toUpperCase(),
        imageUri: imageUrl,
        text: content,
        postId
      });

      console.log("Transaction:", tx);
      toast.success(`Post tokenized successfully! ${tx}`);
      closeModal();
    } catch (error) {
      console.error("Error in tokenization:", error);
      toast.error("Failed to tokenize post. Please try again.");
    }
  };

  const url = watch("tweetUrl");

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
        
        <SocialPreview url={url} />
        
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