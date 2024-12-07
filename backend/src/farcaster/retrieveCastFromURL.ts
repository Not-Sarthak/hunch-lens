import axios from 'axios';

interface CastData {
  result: {
    cast: {
      hash: string;
      text: string;
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

/**
 * Fetches and formats the cast data from Farcaster API to a string.
 * @param url - The Farcaster URL (e.g., https://warpcast.com/<username>/<short_hash>).
 * @returns A promise that resolves to a formatted string with only the requested cast data.
 */
export async function retrieveCastFromURL(url: string): Promise<string> {
  try {
    const urlParts = url.split('/');
    const username = urlParts[urlParts.length - 2];
    const shortHash = urlParts[urlParts.length - 1];

    const apiUrl = `https://build.wield.xyz/farcaster/v2/cast-short?shortHash=${shortHash}&username=${username}`;

    const response = await axios.get<CastData>(apiUrl, {
      headers: {
        'API-KEY': process.env.WEILD_API_KEY || '',
        Accept: 'application/json',
      },
    });

    const cast = response.data.result.cast;

    const images = cast.embeds.images.map((image) => {
      return `URL: ${image.url}, Source URL: ${image.sourceUrl}, Original URL: ${image.originalUrl}`;
    }).join(', ');

    const mentions = cast.mentions.map((mention) => {
      return `Username: ${mention.username}, Display Name: ${mention.displayName}, Following Count: ${mention.followingCount}, Follower Count: ${mention.followerCount}`;
    }).join(', ');

    const author = cast.author;
    const channel = cast.channel;

    const resultString = `
      Hash: ${cast.hash},
      Text: ${cast.text},
      Images: ${images},
      Mentions: ${mentions},
      Author Username: ${author.username},
      Author Display Name: ${author.displayName},
      Author Following Count: ${author.followingCount},
      Author Follower Count: ${author.followerCount},
      Author PFP URL: ${author.pfp.url},
      Author Bio: ${author.bio.text},
      Author Connected Address: ${author.connectedAddress},
      Replies Count: ${cast.replies.count},
      Recast Count: ${cast.recasts.count},
      Reactions Count: ${cast.reactions.count},
      Channel ID: ${channel.channelId},
      Channel Name: ${channel.name},
      Channel Description: ${channel.description},
      Channel Logo URL: ${channel.imageUrl},
      Channel Follower Count: ${channel.followerCount}
    `;

    return resultString;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
