import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Phone,
  Mail,
  User,
  X,
  Check,
  Building,
} from "lucide-react";
import { useCreateContact } from "./hooks/useCreateContact";
import { useUpdateContact } from "./hooks/useUpdateContact";
import { useListContact } from "./hooks/useListContact";
import { useDestroyContact } from "./hooks/useDestroyContact";
import toast from "react-hot-toast";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface FormData {
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
  const [editFormData, setEditFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const { data_list_contact, refetch_list_contact } = useListContact({
    name: filters.name ? { ilike: `${filters.name}%` } : undefined,
    email: filters.email ? { ilike: `${filters.email}%` } : undefined,
    phone: filters.phone ? { ilike: `${filters.phone}%` } : undefined,
    company: filters.company ? { ilike: `${filters.company}%` } : undefined,
  });

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

  console.log(filters);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Gerenciador de Contatos
              </h1>
              <p className="text-gray-400 mt-1">
                Organize e gerencie seus contatos de forma inteligente
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Novo Contato
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="relative flex-1 min-w-[180px]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-blue-400" />
              </div>
              <input
                type="text"
                placeholder="Nome..."
                value={filters.name}
                onChange={(e) => handleFilterChange("name", e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md hover:bg-gray-800/80 min-w-[180px]"
              />
            </div>

            <div className="relative flex-1 min-w-[180px]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-indigo-400" />
              </div>
              <input
                type="text"
                placeholder="Email..."
                value={filters.email}
                onChange={(e) => handleFilterChange("email", e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md hover:bg-gray-800/80 min-w-[180px]"
              />
            </div>

            <div className="relative flex-1 min-w-[180px]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="h-4 w-4 text-green-400" />
              </div>
              <input
                type="text"
                placeholder="Telefone..."
                value={filters.phone}
                onChange={(e) => handleFilterChange("phone", e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md hover:bg-gray-800/80 min-w-[180px]"
              />
            </div>

            <div className="relative flex-1 min-w-[180px]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Building className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Empresa..."
                value={filters.company}
                onChange={(e) => handleFilterChange("company", e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md hover:bg-gray-800/80 min-w-[180px]"
              />
            </div>

            <button
              onClick={clearFilters}
              className="h-[46px] px-4 py-2 bg-gray-700/60 hover:bg-gray-600/80 border border-gray-600/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Limpar Filtros
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data_list_contact?.listContact?.results?.map((contact: Contact) => (
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
          ))}
        </div>

        {data_list_contact?.listContact?.results?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              Nenhum contato encontrado
            </h3>
            <p className="text-gray-500">
              {Object.values(filters).some((filter) => filter.trim() !== "")
                ? "Tente ajustar seus filtros"
                : "Comece adicionando um novo contato"}
            </p>
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700/50 rounded-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-100 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-100">Novo Contato</h2>
              <button
                onClick={resetCreateForm}
                className="p-2 hover:bg-gray-700 text-gray-400 hover:text-gray-200 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={createFormData.name}
                  onChange={handleCreateInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  placeholder="Digite o nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={createFormData.email}
                  onChange={handleCreateInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  placeholder="exemplo@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={createFormData.phone}
                  onChange={handleCreateInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  name="company"
                  value={createFormData.company}
                  onChange={handleCreateInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  placeholder="Nome da empresa"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetCreateForm}
                  className="flex-1 px-4 py-3 border border-gray-600/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-xl transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <Check className="w-4 h-4" />
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700/50 rounded-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-100 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-100">
                Editar Contato
              </h2>
              <button
                onClick={resetEditForm}
                className="p-2 hover:bg-gray-700 text-gray-400 hover:text-gray-200 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  placeholder="Digite o nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  placeholder="exemplo@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  name="company"
                  value={editFormData.company}
                  onChange={handleEditInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  placeholder="Nome da empresa"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetEditForm}
                  className="flex-1 px-4 py-3 border border-gray-600/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-xl transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <Check className="w-4 h-4" />
                  Atualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
