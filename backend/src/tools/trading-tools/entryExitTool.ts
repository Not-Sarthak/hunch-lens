import { ToolConfig } from '../allTools.js';
import { retrieveTweetFromURL } from '../../twitter/getTweetDetails.js';
import { retrieveCastFromURL } from '../../farcaster/retrieveCastFromURL.js';

interface AnalyzeEntryExitArgs {
  url: string;
  engagementThreshold: number;
  sentimentThreshold: number;
}

interface DataResponse {
  engagement: number;
  sentimentScore: number;
  platform: 'Twitter' | 'Farcaster';
}

export const entryExitTool: ToolConfig<AnalyzeEntryExitArgs> = {
  definition: {
    type: 'function',
    function: {
      name: 'analyze_entry_exit',
      description: 'Analyze a URL (Twitter or Farcaster) and decide whether to invest or exit',
      parameters: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'The URL of a tweet or a Farcaster cast',
            pattern: '^(https://api\\.brandbird\\.app/twitter/public/tweets/[0-9]+|https://warpcast\\.com/[^/]+/[^/]+)$',
          },
          engagementThreshold: {
            type: 'number',
            description: 'Minimum engagement level required to invest',
          },
          sentimentThreshold: {
            type: 'number',
            description: 'Minimum sentiment score required to invest',
          },
        },
        required: ['url', 'engagementThreshold', 'sentimentThreshold'],
      },
    },
  },
  handler: async (args: AnalyzeEntryExitArgs) => {
    const { url, engagementThreshold, sentimentThreshold } = args;

    try {
      let data: DataResponse;

      if (url.includes('api.brandbird.app')) {
        const tweetData: any = await retrieveTweetFromURL(url);
        data = {
          engagement: tweetData.engagement,
          sentimentScore: tweetData.sentimentScore,
          platform: 'Twitter',
        };
      } else if (url.includes('warpcast.com')) {
        const castData: any = await retrieveCastFromURL(url);
        data = {
          engagement: castData.engagement,
          sentimentScore: castData.sentimentScore,
          platform: 'Farcaster',
        };
      } else {
        throw new Error('Unsupported URL format.');
      }

      const { engagement, sentimentScore, platform } = data;

      if (engagement > engagementThreshold && sentimentScore >= sentimentThreshold) {
        return {
          decision: 'Invest',
          reason: `High engagement and positive sentiment on ${platform}`,
        };
      } else if (engagement < engagementThreshold * 0.5 || sentimentScore < sentimentThreshold * 0.5) {
        return {
          decision: 'Exit',
          reason: `Low engagement or negative sentiment on ${platform}`,
        };
      } else {
        return {
          decision: 'Hold',
          reason: `Engagement and sentiment are within the neutral range on ${platform}`,
        };
      }
    } catch (error) {
      throw new Error(
        `Failed to analyze the URL: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  },
};
