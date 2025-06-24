import { useQuery } from "@apollo/client";
import { LIST_CONTACT } from "../graphql/queries/listContacts";

export function useListContact() {
  const {
    data: data_list_contact,
    loading: loading_list_contact,
    error: error_list_contact,
    refetch: refetch_list_contact,
  } = useQuery(LIST_CONTACT);

  return {
    data_list_contact,
    loading_list_contact,
    error_list_contact,
    refetch_list_contact,
  };
}
