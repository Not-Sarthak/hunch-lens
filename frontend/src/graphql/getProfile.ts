import { gql } from "@apollo/client";

export default gql`query OwnedHandles($address: EvmAddress!) {
    ownedHandles(
      request: { for: $address }
    ) {
      items {
        id
        fullHandle
        ownedBy
        namespace
        localName
        linkedTo {
          contract {
            address
            chainId
          }
          nftTokenId
        }
        suggestedFormatted {
          full
          localName
        }
      }
      pageInfo {
        next
        prev
      }
    }
  }
`;
