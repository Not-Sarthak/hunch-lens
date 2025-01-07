import { client } from "src/graphql/client";
import getFeed from "src/graphql/getFeed";

const getUserFeed = async (profileId: string): Promise<any> => {
  console.log("Got the Address", profileId);

  try {
    const result = await client.query({
      query: getFeed,
      variables: {
        profileId: profileId,
      },
      fetchPolicy: "network-only",
    });
    console.log("Got the Posts", result);
    return result;
  } catch (error) {
    console.error("Error in getting profiles", error);
    throw error;
  }
};

export default getUserFeed;
