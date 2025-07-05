import { useState, useEffect } from "react";
import { User } from "lucide-react";

interface ContactAvatarProps {
  photoHash: string | null;
}

export function ContactAvatar({ photoHash }: ContactAvatarProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!photoHash) {
        setLoading(false);
        return;
      }

      try {
        // SUA FUNÇÃO PARA BUSCAR A FOTO NA AWS (implemente conforme sua API)
        const url = "abc";
        setPhotoUrl(url);
      } catch (error) {
        console.error("Erro ao carregar foto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [photoHash]);

  if (loading) {
    return (
      <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center animate-pulse" />
    );
  }

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt="User photo"
        className="w-12 h-12 rounded-xl object-cover shadow-lg border border-gray-600"
      />
    );
  }

  return (
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
      <User className="w-6 h-6 text-white" />
    </div>
  );
}

export default ContactAvatar;
