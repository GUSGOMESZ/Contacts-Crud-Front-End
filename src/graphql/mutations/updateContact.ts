import { gql } from "@apollo/client";

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: ID!, $input: UpdateContactInput!) {
    updateContact(id: $id, input: $input) {
      result {
        id
      }
    }
  }
`;
