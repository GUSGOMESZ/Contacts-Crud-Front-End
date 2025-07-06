import { Camera, Check, Loader2, User, X } from "lucide-react";
import { type FormData } from "../App";
import { useEffect, useState } from "react";
import { useGetProfilePhoto } from "../hooks/useGetProfilePhoto";

interface EditContactModalParams {
  resetEditForm: () => void;
  handleEditSubmit: (e?: React.FormEvent) => Promise<void>;
  handleEditInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editFormData: FormData;
  setChangedPhoto: React.Dispatch<React.SetStateAction<boolean>>;
  setPhoto: React.Dispatch<React.SetStateAction<File | null>>;
}

export function EditContactModal({
  resetEditForm,
  handleEditSubmit,
  handleEditInputChange,
  editFormData,
  setChangedPhoto,
  setPhoto,
}: EditContactModalParams) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      const key = editFormData.photoHash;

      if (!key) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const url = await useGetProfilePhoto(key);
        setPhotoUrl(url);
      } catch (error) {
        console.log("Erro ao carregar foto: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [editFormData.photoHash]);

  const handleRemovePhoto = () => {
    setPhotoUrl(null);
    setPhotoPreview(null);
    setChangedPhoto(true);
    setPhoto(null);
    const fileInput = document.getElementById(
      "photo-upload-edit"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setChangedPhoto(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 border border-gray-700/50 rounded-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-100 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Editar Contato</h2>
          <button
            onClick={resetEditForm}
            className="p-2 hover:bg-gray-700 text-gray-400 hover:text-gray-200 rounded-lg transition-colors duration-200"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              {loading ? (
                <div className="w-24 h-24 rounded-full bg-gray-700/50 border-2 border-gray-600/50 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-700/50 border-2 border-gray-600/50 flex items-center justify-center overflow-hidden">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
              )}
              <label
                htmlFor="photo-upload-edit"
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Camera className="w-4 h-4 text-white" />
              </label>
              {(photoUrl || photoPreview) && !loading && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute -top-1 -left-1 w-6 h-6 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 shadow-lg"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              )}
              <input
                id="photo-upload-edit"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                disabled={loading}
              />
            </div>
          </div>
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
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 disabled:opacity-50"
              placeholder="Digite o nome completo"
              disabled={loading}
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
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 disabled:opacity-50"
              placeholder="exemplo@email.com"
              disabled={loading}
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
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 disabled:opacity-50"
              placeholder="(11) 99999-9999"
              disabled={loading}
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
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 disabled:opacity-50"
              placeholder="Nome da empresa"
              disabled={loading}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={resetEditForm}
              className="flex-1 px-4 py-3 border border-gray-600/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Cancelar"
              )}
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Atualizar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
