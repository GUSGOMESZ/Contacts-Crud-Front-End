import { Check, X } from "lucide-react";
import { type FormData } from "../App";

interface CreateContactModalParams {
  resetCreateForm: () => void;
  handleCreateSubmit: (e?: React.FormEvent) => Promise<void>;
  handleCreateInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createFormData: FormData;
}

export function CreateContactModal({
  resetCreateForm,
  handleCreateSubmit,
  handleCreateInputChange,
  createFormData,
}: CreateContactModalParams) {
  return (
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
  );
}
