import { gql } from "@apollo/client";

export const CREATE_CONTACT = gql`
  mutation CreateContact($input: CreateContactInput!) {
    createContact(input: $input) {
      result {
        id
      }
    }
  }
`;
