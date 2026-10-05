export const uploadImageToCloudinary = async (file) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    console.error("Cloudinary Error: Missing environment variables.", {
      cloudName: cloudName ? "Present" : "Missing",
      uploadPreset: uploadPreset ? "Present" : "Missing"
    });
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      return data.secure_url; 
    } else {
      throw new Error(data.error?.message || "Cloudinary upload failed");
    }
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null;
  }
};