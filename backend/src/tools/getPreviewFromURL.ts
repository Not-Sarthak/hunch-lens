import axios from "axios";

interface CastData {
  result: {
    cast: {
      hash: string;
      text: string;
      timestamp: number;
      embeds: {
        images: Array<{
          url: string;
          sourceUrl: string;
          originalUrl: string;
        }>;
      };
      mentions: Array<{
        username: string;
        displayName: string;
        followingCount: number;
        followerCount: number;
        pfp: {
          url: string;
        };
        bio: {
          text: string;
        };
        connectedAddress: string;
      }>;
      author: {
        followingCount: number;
        followerCount: number;
        pfp: {
          url: string;
        };
        bio: {
          text: string;
        };
        connectedAddress: string | null;
      };
      replies: {
        count: number;
      };
      recasts: {
        count: number;
      };
      reactions: {
        count: number;
      };
      channel: {
        channelId: string;
        name: string;
        description: string;
        imageUrl: string;
        followerCount: number;
      };
    };
  };
  source: string;
}

async function retrieveTweetFromURL(url: string): Promise<string> {
  try {
    const tweetId = url.split("/").pop();
    const apiUrl = `https://api.brandbird.app/twitter/public/tweets/${tweetId}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    const tweet = response.data?.tweet;

    if (!tweet) {
      throw new Error("Tweet data is missing in the response.");
    }

    const text = tweet.text || "N/A";
    const mediaUrl = tweet.mediaDetails?.[0]?.media_url_https || "N/A";
    const likes = tweet.likes || 0;
    const replies = tweet.replies || 0;
    const createdAt = tweet.createdAt ? tweet.createdAt : "N/A";
    const avatar = tweet.avatar || "N/A";
    const username = tweet.username || "N/A";
    const name = tweet.name || "N/A";
    const isBlueVerified = tweet.isBlueVerified ? "Yes" : "No";

    const images = tweet.images?.join(", ") || "N/A";
    const videos =
      tweet.video?.map((v: { src: string }) => v.src).join(", ") || "N/A";

    const totalInteractions = likes + replies;

    const result = {
      username,
      name,
      text,
      likes,
      replies,
      totalInteractions,
      createdAt,
      avatar,
      isBlueVerified,
      images: images === "N/A" ? [] : images.split(", "),
      videos: videos === "N/A" ? [] : videos.split(", "),
      mediaUrl: mediaUrl === "N/A" ? null : mediaUrl,
    };

    return JSON.stringify(result);
  } catch (error: any) {
    console.error("Error fetching tweet data:", error.message);
    throw new Error("Failed to retrieve tweet data.");
  }
}

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${time} · ${day} ${month} ${year}`;
}

async function retrieveCastFromURL(url: string): Promise<string> {
  try {
    const urlParts = url.split("/");
    const username = urlParts[urlParts.length - 2];
    const shortHash = urlParts[urlParts.length - 1];

    const apiUrl = `https://build.wield.xyz/farcaster/v2/cast-short?shortHash=${shortHash}&username=${username}`;

    const response = await axios.get<CastData>(apiUrl, {
      headers: {
        "API-KEY": process.env.WEILD_API_KEY || "",
        Accept: "application/json",
      },
    });

    const cast = response.data.result.cast;

    const result = {
      username: username,
      name: cast.author.bio.text.split("\n")[0],
      text: cast.text,
      likes: cast.reactions.count,
      replies: cast.replies.count,
      totalInteractions: cast.reactions.count + cast.replies.count,
      createdAt: formatTimestamp(cast.timestamp),
      avatar: cast.author.pfp.url,
      isBlueVerified: "No",
      images: cast.embeds.images.map((img) => img.url),
      videos: [],
      mediaUrl: null,
    };

    return JSON.stringify(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export const getPreviewFromURL = async (url: string): Promise<string> => {
  if (url.includes("twitter.com") || url.includes("x.com")) {
    return retrieveTweetFromURL(url);
  } else if (url.includes("warpcast.com")) {
    return retrieveCastFromURL(url);
  }
  throw new Error("Invalid URL.");
};
