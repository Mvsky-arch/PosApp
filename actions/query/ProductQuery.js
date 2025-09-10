import { ProductTable } from "@/models/TableModel";

export const GetProductByBisnisId = async (bisnis_id) => {
  const productList = await ProductTable.findAll({
    where: { bisnis_id },
    attributes: [
      "id",
      "product_name",
      "product_description",
      "product_price",
      "product_url",
      "bisnis_id",
    ],
  });
  return productList;
};

export const GetProductByUserId = async (id) => {
  const productList = await ProductTable.findAll({
    where: { user_id: id },
    attributes: [
      "id",
      "product_name",
      "product_description",
      "product_price",
      "product_url",
      "bisnis_id",
    ],
  });
  return productList;
};
