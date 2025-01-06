import { gql } from "@apollo/client";

export default gql`query Feed($profileId: ProfileId!) {
  feed(request: {
    where: {
      for: $profileId
    }
  }) {
    items {
      id
      root {
        ... on Post {
          metadata {
            ... on TextOnlyMetadataV3 {
              id
              content
            }
            ... on ImageMetadataV3 {
              id
              content
              asset {
                image {
                  optimized {
                    uri
                  }
                }
              }
            }
          }
        }
      }
    }
    pageInfo {
      next
    }
  }
}
`;
