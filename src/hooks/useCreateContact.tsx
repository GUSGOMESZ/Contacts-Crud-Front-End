import { useMutation } from "@apollo/client";
import { CREATE_CONTACT } from "../graphql/mutations/createContact";

export function useCreateContact() {
  const [createContact] = useMutation(CREATE_CONTACT);

  return { createContact };
}
