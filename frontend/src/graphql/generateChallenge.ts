import { gql } from "@apollo/client";

export default gql`query Challenge($signedBy: EvmAddress!, $profileId: ProfileId!) {
    challenge(request: { signedBy: $signedBy, for: $profileId }) {
      id
      text
    }
  }
`;
