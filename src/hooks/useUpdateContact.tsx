import { useMutation } from "@apollo/client";
import { UPDATE_CONTACT } from "../graphql/mutations/updateContact";

export function useUpdateContact(refetchContacts: () => void) {
  const [updateContact] = useMutation(UPDATE_CONTACT, {
    onCompleted: () => {
      refetchContacts();
    },
    onError: (error) => {
      console.error("Erro ao editar Contato:", error);
    },
  });

  return { updateContact };
}
