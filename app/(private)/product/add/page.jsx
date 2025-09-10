import ProductFormLayout from "@/component/product/ProductForm";
import getAuthUser from "@/lib/GetAuthUser";

import {
  bisnisListSort,
  kategoryListSort,
  productListSort,
} from "@/lib/MapFilterLib";

import { AddProductProvider } from "@/context/AddProductContext";
import GetStoreData from "@/actions/query/StoreQuery";
import { isNotLogin } from "@/lib/LogCheck";

const AddProductPage = async () => {
  await isNotLogin();

  const authUser = await getAuthUser();
  const { bisnisList, kategory, productList } = await GetStoreData(authUser.id);

  return (
    <AddProductProvider>
      <ProductFormLayout
        bisnisData={JSON.stringify(bisnisListSort(bisnisList))}
        kategoryData={JSON.stringify(kategoryListSort(kategory))}
        productData={JSON.stringify(productListSort(productList))}
      />
    </AddProductProvider>
  );
};

export default AddProductPage;
