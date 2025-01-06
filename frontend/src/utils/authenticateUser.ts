import authenticate from "src/graphql/authenticate";
import { client } from "src/graphql/client";

const AUTH_TOKEN_KEY = "auth_token";

const authenticateUser = async (
  id: string,
  signature: string
): Promise<string> => {
  try {
    const result = await client.mutate({
      mutation: authenticate,
      variables: {
        id,
        sig: signature,
      },
      fetchPolicy: "network-only",
    });

    const accessToken = result.data.authenticate.accessToken;
    console.log("Authenticate User:", accessToken);

    if (accessToken) {
      localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
      console.log("Token Stored Successfully!");
    }

    return accessToken || "";
  } catch (error) {
    console.error("Error in Authentication:", error);
    throw error;
  }
};

export const getStoredToken = (): string | null => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  console.log("Retrieved stored token:", token ? "exists" : "not found");
  return token;
};

export const removeStoredToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  console.log("Access Token Removed Successfully");
};

export default authenticateUser;
