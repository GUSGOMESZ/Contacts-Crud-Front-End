import React, { useState } from "react";
import { Edit, Trash2, Phone, Mail, User, Building } from "lucide-react";
import { useCreateContact } from "./hooks/useCreateContact";
import { useUpdateContact } from "./hooks/useUpdateContact";
import { useListContact } from "./hooks/useListContact";
import { useDestroyContact } from "./hooks/useDestroyContact";
import toast from "react-hot-toast";
import { Header } from "./components/Header";
import { Filter } from "./components/Filter";
import { LoadingCard } from "./components/LoadingCard";
import { NotFound } from "./components/NotFound";
import { CreateContactModal } from "./components/CreateContactModal";
import { EditContactModal } from "./components/EditContactModal";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface IFilter {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [createFormData, setCreateFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [editFormData, setEditFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [filters, setFilters] = useState<IFilter>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const { data_list_contact, loading_list_contact, refetch_list_contact } =
    useListContact({
      name: filters.name ? { ilike: `${filters.name}%` } : undefined,
      email: filters.email ? { ilike: `${filters.email}%` } : undefined,
      phone: filters.phone ? { ilike: `${filters.phone}%` } : undefined,
      company: filters.company ? { ilike: `${filters.company}%` } : undefined,
    });

  // console.log(data_list_contact);

  const { createContact } = useCreateContact(refetch_list_contact);
  const { updateContact } = useUpdateContact(refetch_list_contact);
  const { destroyContact } = useDestroyContact(refetch_list_contact);

  // console.log(data_list_contact?.listContact?.results); // [{…}, {…}]

  const handleCreateSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const input = {
      name: createFormData.name,
      email: createFormData.email,
      phone: createFormData.phone,
      company: createFormData.company,
    };

    const createResponse = await createContact({
      variables: {
        input: input,
      },
    });

    if (createResponse?.data?.createContact?.result !== null) {
      if (photo) {
        console.log("Mandar pra AWS !");
      } else {
        console.log("Sem foto !");
      }
      toast.success("Contato criado com sucesso.");
      resetCreateForm();
    } else {
      toast.error("Erro ao criar contato.");
    }
  };

  const handleEditSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingContact) return;

    const updateResponse = await updateContact({
      variables: {
        id: editingContact.id,
        input: {
          name: editFormData.name,
          phone: editFormData.phone,
          email: editFormData.email,
          company: editFormData.company,
        },
      },
    });

    if (updateResponse?.data?.updateContact?.result !== null) {
      toast.success("Contato atualizado com sucesso.");
      resetEditForm();
    } else {
      toast.error("Erro ao atualizar contato.");
    }
  };

  const handleEditClick = (contact: Contact) => {
    setEditingContact(contact);
    setEditFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const deleteResponse = await destroyContact({
      variables: {
        id: id,
      },
    });

    console.log(deleteResponse);

    if (deleteResponse?.data?.destroyContact?.result !== null) {
      toast.success("Contato excluído com sucesso.");
    } else {
      toast.error("Erro ao excluir contato.");
    }
  };

  const resetCreateForm = () => {
    setCreateFormData({ name: "", email: "", phone: "", company: "" });
    setIsCreateModalOpen(false);
  };

  const resetEditForm = () => {
    setEditFormData({ name: "", email: "", phone: "", company: "" });
    setEditingContact(null);
    setIsEditModalOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      email: "",
      phone: "",
      company: "",
    });
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // console.log(filters);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Header setIsCreateModalOpen={setIsCreateModalOpen} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Filter
          filters={filters}
          handleFilterChange={handleFilterChange}
          clearFilters={clearFilters}
        />

        {loading_list_contact ? (
          <LoadingCard />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data_list_contact?.listContact?.results?.map(
              (contact: Contact) => (
                <div
                  key={contact.id}
                  className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/60 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-gray-900/20 transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleEditClick(contact)}
                        className="p-2 bg-gray-700/80 hover:bg-blue-600/80 text-blue-400 hover:text-white rounded-lg transition-all duration-200 shadow-sm"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="p-2 bg-gray-700/80 hover:bg-red-600/80 text-red-400 hover:text-white rounded-lg transition-all duration-200 shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-100 text-lg mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {contact.name}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-400">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                      <Phone className="w-4 h-4 text-indigo-400" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                      <Building className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">{contact.company}</span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {data_list_contact?.listContact?.results?.length === 0 && (
          <NotFound filters={filters} />
        )}
      </div>

      {isCreateModalOpen && (
        <CreateContactModal
          resetCreateForm={resetCreateForm}
          handleCreateSubmit={handleCreateSubmit}
          handleCreateInputChange={handleCreateInputChange}
          createFormData={createFormData}
          photo={photo}
          setPhoto={setPhoto}
        />
      )}

      {isEditModalOpen && (
        <EditContactModal
          resetEditForm={resetEditForm}
          handleEditSubmit={handleEditSubmit}
          handleEditInputChange={handleEditInputChange}
          editFormData={editFormData}
        />
      )}
    </div>
  );
}
