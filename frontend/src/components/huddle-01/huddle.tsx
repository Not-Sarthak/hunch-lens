"use client";

import React, { useState } from "react";

interface LivestreamButtonProps {
  roomId: string;
  className?: string;
}

const LivestreamButton: React.FC<LivestreamButtonProps> = ({
  roomId,
  className = "bg-gradient-to-b from-[#26262a] to-[#16151a] border border-[#1e1e21] hover:bg-[#16151a] text-white py-2 px-3 mx-2 rounded-lg transition-colors font-light text-sm",
}) => {
  const [isLive, setIsLive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLivestream = async () => {
    try {
      setIsLoading(true);
      setError("");

      const endpoint = isLive ? "stop" : "start";
      const response = await fetch(
        `/api/livestream/${endpoint}?roomId=${roomId}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to toggle livestream");
      }

      if (isLive) {
        console.log("Livestream Stopped", { data });
      } else {
        console.log("Livestream Started", { data });
      }

      setIsLive(!isLive);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Livestream error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="inline-flex flex-col items-center">
      <button
        className={`${className} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleLivestream}
        disabled={isLoading}
      >
        <span className="flex items-center">
          {isLoading ? (
            <span className="inline-block mr-2 animate-spin">⟳</span>
          ) : null}
          {isLive ? "Stop Livestream" : "Start Livestream"}
        </span>
      </button>
      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default LivestreamButton;
