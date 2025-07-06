import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { useGetProfilePhoto } from "../hooks/useGetProfilePhoto";

interface ContactAvatarProps {
  photoHash: string | null;
  className?: string;
}

export function ContactAvatar({
  photoHash,
  className = "",
}: ContactAvatarProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  console.log(photoHash);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!photoHash) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const url = await useGetProfilePhoto(photoHash);
        setPhotoUrl(url);
      } catch (error) {
        console.error("Erro ao carregar foto:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [photoHash]);

  if (loading && photoHash) {
    return (
      <div className={`rounded-full bg-gray-800 animate-pulse ${className}`} />
    );
  }

  if (photoUrl && !error) {
    return (
      <img
        src={photoUrl}
        alt="User photo"
        className={`rounded-full object-cover shadow-md ${className}`}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <div
      className={`bg-gray-800 rounded-full flex items-center justify-center ${className}`}
    >
      <User className="w-1/2 h-1/2 text-gray-400" />
    </div>
  );
}
