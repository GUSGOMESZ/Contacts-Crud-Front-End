export async function useGetProfilePhoto(photoKey: string) {
  try {
    const encodedKey = encodeURIComponent(photoKey);
    const response = await fetch(
      `http://localhost:4000/api/get_profile_photo?key=${encodedKey}`
    );

    if (response.ok) {
      const data = await response.json();
      return data.presignedUrl;
    } else {
      console.log("Erro ao obter a foto, hash: " + photoKey);
      return null;
    }
  } catch (error) {
    console.log("Erro ao obter a foto, hash: " + photoKey);
    return null;
  }
}
