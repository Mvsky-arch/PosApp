"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BisnisList from "@/component/BisnisList";
import KategoryList from "@/component/KategoryList";
import PrimaryButton from "@/component/item/button/PrimaryButton";

const ProductPage = ({ bisnisData, kategoryData, productData }) => {
  const params = useSearchParams();
  const [bisnisIdSelected, setBisnisIdSelected] = useState(0);
  const [kategoryIdSelected, setKategoryIdSelected] = useState(0);

  let bisnisid = params.get("bisnisid");
  let kategoryid = params.get("categoryid");

  useEffect(() => {
    const bisnisListObj = JSON.parse(bisnisData);

    if (bisnisListObj.length > 0) {
      if (bisnisid) {
        setBisnisIdSelected(parseInt(bisnisid));
      } else {
        setBisnisIdSelected(bisnisListObj[0].id);
      }
      if (kategoryid) {
        setKategoryIdSelected(parseInt(kategoryid));
      }
    }
  }, []);

  return (
    <div className="Page-Layout-Col my-8 border-1 border-slate-400">
      <div className="_flex_row px-8 py-2  items-center justify-between bg-slate-200 border-b-1 border-slate-400 ">
        <span>Product and Category Page</span>
        <ProductKategoryButton
          bisnisIdSelected={bisnisIdSelected}
          kategoryIdSelected={kategoryIdSelected}
        />
      </div>
      <div className="_flex_row ">
        <BisnisList
          setBisnisIdSelected={setBisnisIdSelected}
          bisnisData={bisnisData}
          bisnisIdSelected={bisnisIdSelected}
          setKategoryIdSelected={setKategoryIdSelected}
        />
        <KategoryList
          bisnisIdSelected={bisnisIdSelected}
          kategoryIdSelected={kategoryIdSelected}
          kategoryData={kategoryData}
          productData={productData}
          setKategoryIdSelected={setKategoryIdSelected}
        />
      </div>
    </div>
  );
};

const ProductKategoryButton = ({ bisnisIdSelected, kategoryIdSelected }) => {
  const router = useRouter();
  return (
    <div className="_flex_row gap-4 items-center">
      <PrimaryButton
        classType="primary-button"
        label="Add Product"
        clickAction={() =>
          router.push(
            `/product/add?bisnisid=${bisnisIdSelected}&categoryid=${kategoryIdSelected}`
          )
        }
      />

      <PrimaryButton
        classType="primary-button"
        label="Add Kategory"
        clickAction={() =>
          router.push(`/product/add-category?bisnisid=${bisnisIdSelected}`)
        }
      />
    </div>
  );
};

export default ProductPage;
