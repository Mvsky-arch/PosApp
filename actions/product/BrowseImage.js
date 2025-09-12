"use server";
import fs from "node:fs/promises";
import { AppConfig } from "@/config/Const";

const BrowseImage = async () => {
  const files = await fs.readdir(AppConfig.product_image_path);
  const images_url = files.map((file) => `${AppConfig.url_image}${file}`);
  return images_url;
};

export default BrowseImage;
