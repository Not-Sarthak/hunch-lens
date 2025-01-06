import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-v2.lens.dev/",
  cache: new InMemoryCache(),
});
