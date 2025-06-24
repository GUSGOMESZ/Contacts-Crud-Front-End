import { useMutation } from "@apollo/client";
import { DESTROY_CONTACT } from "../graphql/mutations/destroyContact";

export function useDestroyContact(refetchContacts: () => void) {
  const [destroyContact] = useMutation(DESTROY_CONTACT, {
    onCompleted: () => {
      refetchContacts();
    },
    onError: (error) => {
      console.error("Erro ao deletar Contato:", error);
    },
  });

  return { destroyContact };
}
