import authenticate from "src/graphql/authenticate";
import { client } from "src/graphql/client";

export const AUTH_TOKEN_KEY = "auth_token";
export const PROFILE_ID_KEY = "profile_id";

const authenticateUser = async (
  id: string,
  signature: string,
  profileId: string
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

    if (accessToken && profileId) {
      localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
      console.log("Token Stored Successfully!");
      localStorage.setItem(PROFILE_ID_KEY, profileId);
      console.log("ProfileId Stored Successfully!");
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

export const getStoredId = (): string | null => {
  const token = localStorage.getItem(PROFILE_ID_KEY);
  console.log("Retrieved ProfileId:", token ? "exists" : "not found");
  return token;
};

export const removeStoredId = (): void => {
  localStorage.removeItem(PROFILE_ID_KEY);
  console.log("Profile ID Removed Successfully");
};

export default authenticateUser;
