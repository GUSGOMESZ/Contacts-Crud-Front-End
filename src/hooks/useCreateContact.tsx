import { useMutation } from "@apollo/client";
import { CREATE_CONTACT } from "../graphql/mutations/createContact";
import toast from "react-hot-toast";

export function useCreateContact(refetchContacts: () => void) {
  const [createContact] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      refetchContacts();
    },
    onError: (error) => {
      toast.error("Erro ao criar Contato: " + error);
    },
  });

  return { createContact };
}
