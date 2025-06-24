import { gql } from "@apollo/client";

export const LIST_CONTACT = gql`
  query ListContact {
    listContact {
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
