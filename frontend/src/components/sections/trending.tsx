"use client";

import React, { useEffect, useState } from "react";
import CastCard from "../cards/cast-card";
import { castData } from "../../utils/cast-data";

interface CastData {
  hash: string;
  text: string;
  embeds: {
    images: Array<{
      url: string;
      alt: string;
    }>;
  };
  author: {
    username: string;
    displayName: string;
    pfp: {
      url: string;
      verified: boolean;
    };
    bio: {
      text: string;
    };
    connectedAddress: string;
  };
  replies: { count: number };
  reactions: { count: number };
  recasts: { count: number };
}

const Trending = () => {
  const [casts, setCasts] = useState<CastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCasts = async () => {
      try {
        // Simulated Axios call with a delay
        const simulatedResponse = await new Promise<{ data: { result: { casts: CastData[] } } }>((resolve) =>
          setTimeout(() => {
            resolve({
              data: {
                result: {
                  casts: castData.map((item) => item.result.cast), // Map dummy data
                },
              },
            });
          }, 500)
        );

        setCasts(simulatedResponse.data.result.casts);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch trending casts.");
        setLoading(false);
      }
    };

    fetchCasts();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="text-neutral-500 text-base font-light font-inter leading-tight pb-4">
        Trending on Warpcast
      </div>
      <div className="space-y-4">
        {casts.map((cast) => (
          <CastCard key={cast.hash} data={cast} />
        ))}
      </div>
    </div>
  );
};

export default Trending;
