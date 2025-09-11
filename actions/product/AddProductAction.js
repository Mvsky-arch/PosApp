"use server";
import getAuthUser from "@/lib/GetAuthUser";
import { redirect } from "next/navigation";
import { ProductFormSchema } from "@/lib/Rules";
import { ProductTable } from "@/models/TableModel";

import fs from "fs/promises";
import path from "path";

const AddProductAction = async (state, formData) => {
  const authUser = await getAuthUser();
  const { id } = authUser;

  if (!id) {
    redirect("/login");
  }
  const actions = formData.get("actions");
  const product_id = formData.get("product_id");
  const thumbnail = formData.get("thumbnail");
  const bisnis_id_hid = formData.get("bisnis_id_hid");
  const bisnis_id = formData.get("bisnis_id");
  const product_url = formData.get("product_url");
  const product_name = formData.get("product_name");
  const product_description = formData.get("product_description");
  const product_price = formData.get("product_price");
  const kategory_id = formData.get("kategory_id");

  let message, url;

  const validateFields = ProductFormSchema.safeParse({
    product_name,
    product_description,
    product_price,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      product_name,
      product_description,
      product_price,
    };
  }

  if (actions === "Insert") {
    const productId = Date.now();

    if (thumbnail.size > 0) {
      url = await UploadThumbnail(thumbnail, bisnis_id, productId, null);
    } else {
      url = "http://103.197.191.88:3000/empty.jpg";
    }

    ProductTable.create({
      id: productId,
      product_name,
      product_description,
      product_price,
      bisnis_id,
      user_id: id,
      product_url: url,
      is_active: 1,
      kategory_id,
    });

    message = product_name + " Add Completed";
  }

  if (actions === "Update") {
    if (thumbnail.size > 0) {
      await UploadThumbnail(thumbnail, bisnis_id_hid, null, product_url);
    }

    await ProductTable.update(
      {
        product_name,
        product_description,
        product_price,
        bisnis_id: bisnis_id_hid,
        user_id: id,
        product_url,
        is_active: 1,
        kategory_id,
      },
      {
        where: {
          id: parseInt(product_id),
        },
      }
    );
    message = product_name + " Update Completed";
  }

  return {
    message,
    completed: true,
    kategory_id,
  };
};

const UploadThumbnail = async (file, foldername, filename, url) => {
  const uploadDir = path.join(process.cwd(), "public", `uploads/${foldername}`);
  await fs.mkdir(uploadDir, { recursive: true });

  let fileNameWithExt;
  if (filename) {
    fileNameWithExt = filename + "." + file.name.split(".").pop();
  } else {
    fileNameWithExt = url.split("/").pop();
  }

  const filePath = path.join(uploadDir, fileNameWithExt);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return `http://103.197.191.88:3000/uploads/${foldername}/${fileNameWithExt}`;
};

export default AddProductAction;
