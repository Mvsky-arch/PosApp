"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductList = ({ productData, bisnisIdSelected, kategoryIdSelected }) => {
  const productListObj = JSON.parse(productData);
  let isProductFound = false;
  const router = useRouter();
  return (
    <div className="flex flex-col w-full min-h-[600px]">
      <div className="grid grid-cols-6 w-full gap-y-4 gap-x-4 max-h-[550px] overflow-auto p-6">
        {productListObj?.map((item) => {
          if (item.bisnis_id !== bisnisIdSelected) return null;

          if (kategoryIdSelected === 0) {
            isProductFound = true;
            return (
              <div
                key={item.id}
                onClick={() => {
                  router.push(
                    `product/add?bisnisid=${bisnisIdSelected}&categoryid=${kategoryIdSelected}&productid=${item.id}`
                  );
                }}
              >
                <Product
                  name={item.product_name}
                  price={item.product_price}
                  url={item.product_url}
                />
              </div>
            );
          }

          if (item.kategory_id === kategoryIdSelected) {
            isProductFound = true;
            return (
              <div
                key={item.id}
                onClick={() => {
                  router.push(
                    `product/add?bisnisid=${bisnisIdSelected}&categoryid=${kategoryIdSelected}&productid=${item.id}`
                  );
                }}
              >
                <Product
                  id={item.id}
                  name={item.product_name}
                  price={item.product_price}
                  url={item.product_url}
                />
              </div>
            );
          }
        })}
      </div>
      {/* {!isProductFound && (
        <div className="p-12 w-full items-center bg-blue-300">
          Produk Pada Kategory Ini Tidak Ditemukan !!!!
        </div>
      )} */}
    </div>
  );
};

const Product = ({ name, price, url }) => {
  return (
    <div
      className="flex flex-col w-full rounded-lg border-1 hover:border-slate-800 border-slate-300 hover:shadow-2xl shadow-xl items-start
     justify-between cursor-pointer h-full overflow-hidden bg-white"
    >
      <div className="flex flex-row items-center justify-center w-full ">
        <img
          src={url}
          width={100}
          height={100}
          alt="Product Images"
          className="w-full"
        />
      </div>
      <div className="w-full px-4 py-2">
        <div className="text-sm h-[50px] w-full two-lines-text">{name}</div>
        <div className="text-sm text-end font-semibold mt-1">{price}</div>
      </div>
    </div>
  );
};

export default ProductList;
