import { client } from "src/graphql/client";
import generateChallenge from "src/graphql/generateChallenge";

const genChallenge = async (
  profileId: string,
  address: string
): Promise<any> => {
  console.log("Got the Address", profileId);

  try {
    const result = await client.query({
      query: generateChallenge,
      variables: {
        signedBy: address,
        profileId: profileId,
      },
      fetchPolicy: "network-only",
    });
    console.log("Got the Challenge", result?.data.challenge.text);
    return result?.data.challenge || [];
  } catch (error) {
    console.error("Error in getting profiles", error);
    throw error;
  }
};

export default genChallenge;
