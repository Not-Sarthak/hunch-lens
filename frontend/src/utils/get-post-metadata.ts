import { client } from "src/graphql/client";
import getPostFromId from "src/graphql/getPostFromId";

const getPostMetadata = async (postId: string): Promise<any> => {
  try {
    console.log("Getting the Profiles");
    const result = await client.query({
      query: getPostFromId,
      variables: {
        postId,
      },
      fetchPolicy: "network-only",
    });
    console.log("Got the Post", result);
    return result;
  } catch (error) {
    console.error("Error in Getting Profiles", error);
    throw error;
  }
};

export default getPostMetadata;
