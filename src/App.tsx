import React, { useState } from "react";
import { Edit, Trash2, Phone, Mail } from "lucide-react";
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
import { ContactAvatar } from "./components/ContactAvatar";
import { v4 as uuidv4 } from "uuid";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  photoHash: string;
  createdAt: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  photoHash?: string | null;
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
    photoHash: null,
  });
  const [changedPhoto, setChangedPhoto] = useState<boolean>(false);
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

  const handleCreateSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const possibleHash = photo ? uuidv4() : "";

    const input = {
      name: createFormData.name,
      email: createFormData.email,
      phone: createFormData.phone,
      company: createFormData.company,
      photoHash: possibleHash,
    };

    try {
      const createResponse = await createContact({
        variables: { input },
      });

      if (!createResponse?.data?.createContact?.result) {
        throw new Error("Falha na criação do contato");
      }

      if (photo) {
        const uploadForm = new FormData();
        uploadForm.append("photo", photo);
        uploadForm.append("hash", possibleHash);

        const response = await fetch(
          `http://localhost:4000/api/upload_profile_photo`,
          { method: "POST", body: uploadForm }
        );

        if (!response.ok) {
          throw new Error("Falha no upload da foto");
        }
      }

      toast.success("Contato criado com sucesso.");
      resetCreateForm();
      refetch_list_contact();
    } catch (error) {
      console.error("Erro completo:", error);
    }
  };

  const handleEditSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingContact) return;

    console.log(editFormData);
    console.log(photo);

    let newPhotoHash: string | null = "";
    const uploadForm = new FormData();

    if (changedPhoto && !photo) newPhotoHash = null;

    if (changedPhoto && photo) {
      newPhotoHash = uuidv4();

      uploadForm.append("photo", photo);
      uploadForm.append("hash", newPhotoHash);
    }

    const updateResponse = await updateContact({
      variables: {
        id: editingContact.id,
        input: {
          name: editFormData.name,
          phone: editFormData.phone,
          email: editFormData.email,
          company: editFormData.company,
          photoHash: newPhotoHash,
        },
      },
    });

    if (updateResponse?.data?.updateContact?.result !== null) {
      const oldHash = editFormData.photoHash;

      if (oldHash) {
        const deletePhotoResponse = await fetch(
          `http://localhost:4000/api/delete_profile_photo?hash=${oldHash}`,
          {
            method: "DELETE",
          }
        );

        console.log(deletePhotoResponse);
      }

      const response = await fetch(
        `http://localhost:4000/api/upload_profile_photo`,
        { method: "POST", body: uploadForm }
      );

      if (!response.ok) {
        throw new Error("Falha no upload da foto");
      }

      toast.success("Contato atualizado com sucesso.");
      resetEditForm();
      refetch_list_contact();
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
      photoHash: contact.photoHash,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string, hash: string) => {
    const deleteResponse = await destroyContact({
      variables: {
        id: id,
      },
    });

    console.log(deleteResponse);

    if (deleteResponse?.data?.destroyContact?.result !== null) {
      if (hash) {
        const deletePhotoResponse = await fetch(
          `http://localhost:4000/api/delete_profile_photo?hash=${hash}`,
          {
            method: "DELETE",
          }
        );

        console.log(deletePhotoResponse);
      }

      toast.success("Contato excluído com sucesso.");
    } else {
      toast.error("Erro ao excluir contato.");
    }
  };

  const resetCreateForm = () => {
    setCreateFormData({ name: "", email: "", phone: "", company: "" });
    setIsCreateModalOpen(false);
    setPhoto(null);
  };

  const resetEditForm = () => {
    setEditFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      photoHash: null,
    });
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
                  className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-20 bg-gradient-to-r from-indigo-900/30 to-purple-900/30">
                    <div className="absolute -bottom-7 left-5">
                      <ContactAvatar
                        key={contact.id}
                        photoHash={contact.photoHash}
                        className="w-18 h-18 border-4 border-gray-900"
                      />
                    </div>
                  </div>

                  <div className="pt-9 px-5 pb-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-100 text-xl">
                          {contact.name}
                        </h3>
                        {contact.company && (
                          <p className="text-sm text-gray-400 mt-1">
                            {contact.company}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEditClick(contact)}
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(contact.id, contact.photoHash)
                          }
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 mt-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-8 h-8 bg-blue-900/20 rounded-full flex items-center justify-center">
                          <Mail className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <span className="text-sm truncate">
                          {contact.email}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-8 h-8 bg-indigo-900/20 rounded-full flex items-center justify-center">
                          <Phone className="w-3.5 h-3.5 text-indigo-400" />
                        </div>
                        <span className="text-sm">{contact.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto px-5 py-3 border-t border-gray-800 text-xs text-gray-500">
                    <span>
                      Criado em{" "}
                      {new Date(contact.createdAt).toLocaleDateString("pt-BR")}
                    </span>
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
          setPhoto={setPhoto}
        />
      )}

      {isEditModalOpen && (
        <EditContactModal
          resetEditForm={resetEditForm}
          handleEditSubmit={handleEditSubmit}
          handleEditInputChange={handleEditInputChange}
          editFormData={editFormData}
          setChangedPhoto={setChangedPhoto}
          setPhoto={setPhoto}
        />
      )}
    </div>
  );
}
