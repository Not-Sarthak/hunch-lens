import { gql } from "@apollo/client";

export default gql`query {
    feed(request: { where: { for: "0x28a2" } }) {
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
