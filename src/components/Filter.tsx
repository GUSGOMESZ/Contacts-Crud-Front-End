import { Building, Mail, Phone, User, X } from "lucide-react";
import { type IFilter } from "../App";

interface FilterParams {
  filters: IFilter;
  handleFilterChange: (field: string, value: string) => void;
  clearFilters: () => void;
}

export function Filter({
  filters,
  handleFilterChange,
  clearFilters,
}: FilterParams) {
  return (
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
  );
}
