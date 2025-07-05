import { User } from "lucide-react";
import { type IFilter } from "../App";

interface NotFoundParams {
  filters: IFilter;
}

export function NotFound({ filters }: NotFoundParams) {
  return (
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
  );
}
