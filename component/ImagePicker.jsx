// import fs from "fs/promises";
// import path from "path";

// export async function uploadImage(formData) {
//   const imageFile = formData.get("image");

//   if (!imageFile) {
//     return { success: false, message: "No image file provided." };
//   }

//   if (!imageFile.type.startsWith("image/")) {
//     return { success: false, message: "Only image files are allowed." };
//   }

// const uploadDir = path.join(process.cwd(), "public", "uploads");
// await fs.mkdir(uploadDir, { recursive: true }); // Ensure directory exists

//   const filePath = path.join(uploadDir, imageFile.name);
//   const buffer = Buffer.from(await imageFile.arrayBuffer());
//   await fs.writeFile(filePath, buffer);

//   console.log(`Image uploaded to: /uploads/${imageFile.name}`);

//   return { success: true, message: "Image uploaded successfully!" };
// }
