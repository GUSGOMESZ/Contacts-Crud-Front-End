import { gql } from "@apollo/client";

export const LIST_CONTACT = gql`
  query ListContact($filter: ContactFilterInput) {
    listContact(filter: $filter) {
      results {
        id
        phone
        name
        email
        company
      }
    }
  }
`;
