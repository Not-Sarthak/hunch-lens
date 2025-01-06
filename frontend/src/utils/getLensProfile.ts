import { client } from "src/graphql/client";
import getProfile from "src/graphql/getProfile";

const getProfiles = async (
  address: string,
  limit = 10,
  cursor = null
): Promise<any> => {
  console.log("got the address", address);

  try {
    const result = await client.query({
      query: getProfile,
      variables: {
        address: address,
      },
      fetchPolicy: "network-only",
    });
    console.log("Got the Profiles", result?.data?.ownedHandles?.items);
    return result?.data?.ownedHandles?.items || [];
  } catch (error) {
    console.error("Error in getting profiles", error);
    throw error;
  }
};

export default getProfiles;
