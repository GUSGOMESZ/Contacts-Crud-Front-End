import { useQuery } from "@apollo/client";
import { LIST_CONTACT } from "../graphql/queries/listContacts";

interface StringFilter {
  ilike?: string;
}

interface ContactFilter {
  name?: StringFilter;
  email?: StringFilter;
  phone?: StringFilter;
  company?: StringFilter;
}

export function useListContact(filter: ContactFilter) {
  const {
    data: data_list_contact,
    loading: loading_list_contact,
    error: error_list_contact,
    refetch: refetch_list_contact,
  } = useQuery(LIST_CONTACT, {
    variables: {
      filter,
    },
  });

  return {
    data_list_contact,
    loading_list_contact,
    error_list_contact,
    refetch_list_contact,
  };
}
