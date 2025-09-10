import CategoryForm from "@/component/product/CategoryForm";
import getAuthUser from "@/lib/GetAuthUser";
import GetStoreData from "@/actions/query/StoreQuery";

import { bisnisListSort, kategoryListSort } from "@/lib/MapFilterLib";
import { isNotLogin } from "@/lib/LogCheck";

const AddCategory = async () => {
  await isNotLogin();

  const authUser = await getAuthUser();
  const { bisnisList, kategory } = await GetStoreData(authUser.id);

  return (
    <CategoryForm
      bisnisList={JSON.stringify(bisnisListSort(bisnisList))}
      kategoryList={JSON.stringify(kategoryListSort(kategory))}
    />
  );
};

export default AddCategory;
