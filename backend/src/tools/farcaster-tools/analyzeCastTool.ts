import { ToolConfig } from '../allTools.js';
import { retrieveCastFromURL } from '../../farcaster/retrieveCastFromURL.js';

interface GetCastArgs {
  url: string;
}

export const retrieveCastTool: ToolConfig<GetCastArgs> = {
  definition: {
    type: 'function',
    function: {
      name: 'get_cast_data',
      description: 'Retrieve and format cast data from a Farcaster URL',
      parameters: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'The Farcaster URL (e.g., https://warpcast.com/<username>/<short_hash>)',
            pattern: '^https://warpcast\\.com/[^/]+/[^/]+$'
          }
        },
        required: ['url']
      }
    }
  },
  handler: async (args: GetCastArgs) => {
    try {
      return await retrieveCastFromURL(args.url);
    } catch (error) {
      throw new Error(`Failed to retrieve Farcaster cast: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};