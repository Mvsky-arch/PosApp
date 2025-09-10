import getAuthUser from "@/lib/GetAuthUser";
import GetStoreData from "@/actions/query/StoreQuery";
import ProductPage from "@/component/page/ProductPage";
import { ProductPageProvider } from "@/context/ProductPageContext";
import { redirect } from "next/navigation";

import {
  bisnisListSort,
  kategoryListSort,
  productListSort,
} from "@/lib/MapFilterLib";

const PageProduct = async () => {
  const authUser = await getAuthUser();
  if (!authUser) {
    redirect("/login");
  }

  const { bisnisList, kategory, productList } = await GetStoreData(
    authUser?.id
  );

  return (
    <ProductPageProvider>
      <ProductPage
        bisnisData={JSON.stringify(bisnisListSort(bisnisList))}
        kategoryData={JSON.stringify(kategoryListSort(kategory))}
        productData={JSON.stringify(productListSort(productList))}
      />
    </ProductPageProvider>
  );
};

export default PageProduct;
