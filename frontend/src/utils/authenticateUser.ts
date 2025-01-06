import authenticate from "src/graphql/authenticate";
import { client } from "src/graphql/client";

const authenticateUser = async (
  id: string,
  signature: string
): Promise<any> => {
  try {
    const result = await client.mutate({
      mutation: authenticate,
      variables: {
        id,
        sig: signature,
      },
      fetchPolicy: "network-only",
    });
    console.log("Got the challenge", result);
    return result || [];
  } catch (error) {
    console.error("Error in getting profiles", error);
    throw error;
  }
};

export default authenticateUser;
