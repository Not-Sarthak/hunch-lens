import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN_KEY } from "src/utils/authenticate-user";

const httpLink = createHttpLink({
  uri: "https://api-v2.lens.dev/",
});

const authLink = setContext((_, { headers }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  return {
    headers: {
      ...headers,
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
