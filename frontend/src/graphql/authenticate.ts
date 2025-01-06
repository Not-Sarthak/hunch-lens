import { gql } from "@apollo/client";

export default gql`mutation Authenticate($id: ChallengeId!, $sig: Signature!) {
    authenticate(request: { id: $id, signature: $sig }) {
      accessToken
      refreshToken
      identityToken
    }
  }
`;
