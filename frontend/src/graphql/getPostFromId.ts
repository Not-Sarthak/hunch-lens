import { gql } from "@apollo/client";

export default gql`query publication($postId: PublicationId!) {
    publication(request: { forId: $postId }) {
      ... on Post {
        by {
          createdAt
          handle {
            id
            linkedTo {
              nftTokenId
            }
            ownedBy
          }
        }
        metadata {
          ... on VideoMetadataV3 {
            asset {
              cover {
                optimized {
                  uri
                  mimeType
                }
              }
            }
            content
            rawURI
            title
          }
          ... on ImageMetadataV3 {
            content
            rawURI
            title
            asset {
              image {
                optimized {
                  uri
                }
              }
            }
          }
          ... on TextOnlyMetadataV3 {
            content
            rawURI
          }
        }
        stats {
          quotes
          mirrors
          reactions
          comments
        }
      }
    }
  }
`;
