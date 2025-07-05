import { Plus } from "lucide-react";

interface HeaderParams {
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Header({ setIsCreateModalOpen }: HeaderParams) {
  return (
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
  );
}
