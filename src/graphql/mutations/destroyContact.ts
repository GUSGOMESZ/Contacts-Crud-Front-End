import { gql } from "@apollo/client";

export const DESTROY_CONTACT = gql`
  mutation DestroyContact($id: ID!) {
    destroyContact(id: $id) {
      result {
        company
        email
        id
        name
        phone
      }
    }
  }
`;
