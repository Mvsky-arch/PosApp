"use client";
import { useState, useRef, useEffect } from "react";
import { useResettableActionState } from "use-resettable-action-state";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import { SetErrorList } from "@/lib/AppLib";
import { SuccessInfo } from "@/component/alert/SuccessInfo";
import LabelWithNumber from "@/component/item/LabelWithNumber";

import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import { SelectRightIcon } from "@/component/item/Icon";

import AddProductAction from "@/actions/product/AddProductAction";
import { InsertUpdateSelector } from "@/component/item/button/PrimaryButton";
import { useAddProductContext } from "@/context/AddProductContext";

import { AppConfig } from "@/config/Const";

import {
  getProductByBisnisId,
  getProductByKategoryId,
} from "@/lib/MapFilterLib";
import BrowseImage from "@/actions/product/BrowseImage";

const ProductFormLayout = ({ bisnisData, kategoryData, productData }) => {
  const params = useSearchParams();
  const { bisnisIdSelected, setProductListFiltered } = useAddProductContext();

  const bisnisid = params.get("bisnisid");
  const categoryid = params.get("categoryid");
  const productid = params.get("productid");

  const bisnisDataObj = JSON.parse(bisnisData);
  const kategoryDataObj = JSON.parse(kategoryData);
  const productDataObj = JSON.parse(productData);

  useEffect(() => {
    setProductListFiltered(
      getProductByBisnisId(productDataObj, bisnisIdSelected)
    );
  }, [bisnisIdSelected]);

  return (
    <div className="container flex flex-row max-h-[750px] justify-between mx-auto my-4 border-1 border-slate-400 shadow-2xl">
      <ProductForm
        bisnisid={bisnisid}
        categoryid={categoryid}
        bisnisDataObj={bisnisDataObj}
        kategoryDataObj={kategoryDataObj}
        productDataObj={productDataObj}
      />

      <div className="w-[30%] max-h-[750px] border-l-1 border-slate-400 bg-slate-200 overflow-y-auto ">
        <ExistingProduct productDataObj={productDataObj} />
      </div>
    </div>
  );
};

const ProductForm = ({
  bisnisid,
  categoryid,
  bisnisDataObj,
  kategoryDataObj,
  productDataObj,
}) => {
  const {
    actions,
    setActions,
    productClicked,
    setProductClicked,
    bisnisIdSelected,
    setBisnisIdSelected,
    kategoryListSelected,
    setKategoryListSelected,
    setProductListFiltered,
  } = useAddProductContext();

  const [state, action, isPending, reset] = useResettableActionState(
    AddProductAction,
    {}
  );

  const [defaultUrl, setDefaultUrl] = useState(
    AppConfig.url_image + "default.jpg"
  );

  const [isopenSuccessModal, setIsOpenSuccessModal] = useState(true);
  const [isOpenImageSelectorModal, setIsOpenImageSelectorModal] =
    useState(false);

  const actionsElement = useRef();
  const productIdElement = useRef();
  const bisnisIdHiddenElement = useRef();
  const bisnisElement = useRef();
  const kategoryElement = useRef();
  const productNameElement = useRef();
  const descriptionElement = useRef();
  const priceElement = useRef();

  useEffect(() => {
    onBisnisChangeHandler();
    kategoryElement.current.value = categoryid;
    const productByBisnisId = getProductByBisnisId(
      productDataObj,
      parseInt(bisnisElement.current.value)
    );

    setProductListFiltered(productByBisnisId);
  }, []);

  useEffect(() => {
    Object.keys(productClicked).length > 0 ? setUpdatetMode() : setInsertMode();
  }, [productClicked]);

  const setUpdatetMode = () => {
    actionsElement.current.value = "Update";
    productIdElement.current.value = productClicked?.id;
    bisnisElement.current.value = productClicked?.bisnis_id;
    kategoryElement.current.value = productClicked?.kategory_id;
    productNameElement.current.value = productClicked?.product_name;
    descriptionElement.current.value = productClicked?.product_description;
    priceElement.current.value = productClicked?.product_price;
    setDefaultUrl(productClicked?.product_url);
    setActions("Update");
  };

  const setInsertMode = () => {
    actionsElement.current.value = "Insert";
    productIdElement.current.value = "";
    productNameElement.current.value = "";
    descriptionElement.current.value = "";
    priceElement.current.value = "";
    setDefaultUrl(AppConfig.url_image + "default.jpg");
    reset();
    setActions("Insert");
  };

  const onBisnisChangeHandler = () => {
    const kategoryArr = kategoryDataObj
      .slice()
      .filter(
        (kategory) =>
          kategory.bisnis_id === parseInt(bisnisElement.current.value)
      );
    setBisnisIdSelected(parseInt(bisnisElement.current.value));
    bisnisIdHiddenElement.current.value = parseInt(bisnisElement.current.value);
    setKategoryListSelected(kategoryArr);
    setProductClicked({});
  };

  const onKategoryChangeHandler = () => {};

  return (
    <form
      action={action}
      className="w-[70%] bg-white justify-between flex flex-col gap-1 "
    >
      <div className="space-y-1 px-18 mt-10 ">
        {state?.completed && (
          <SuccessInfo
            isOpen={isopenSuccessModal}
            onGotIt={() => {
              setIsOpenSuccessModal(false);
              redirect(
                `/product?bisnisid=${bisnisIdSelected}&categoryid=${state?.kategory_id}`
              );
            }}
            title="Success Information !!"
            message={state?.message}
          />
        )}
        <InsertUpdateSelector
          actions={actions}
          cancelAction={() => setProductClicked({})}
        />

        <input type="hidden" name="product_url" value={defaultUrl} />
        <HiddenInput name="bisnis_id_hid" ref={bisnisIdHiddenElement} />
        <HiddenInput name="actions" ref={actionsElement} />
        <HiddenInput name="product_id" ref={productIdElement} />

        <BisnisSelector
          name="bisnis_id"
          ref={bisnisElement}
          onChange={onBisnisChangeHandler}
          defaultValue={bisnisid}
          disabled={actions === "Update" ? true : false}
          data={bisnisDataObj}
        />
        <ImageSelectorModal
          isOpen={isOpenImageSelectorModal}
          onCancel={() => {
            setIsOpenImageSelectorModal(false);
          }}
          setDefaultUrl={setDefaultUrl}
        />

        <div className="flex flex-row w-full justify-between gap-2">
          <div
            className="flex flex-col gap-1 justify-between hover:border-blue-500 border-1 border-slate-300 p-2 cursor-pointer rounded-2xl"
            onClick={() => {
              setIsOpenImageSelectorModal(true);
            }}
          >
            <div className="relative h-[150px] w-[150px]">
              <Image
                src={defaultUrl}
                width={50}
                height={50}
                alt={defaultUrl}
                className="w-full rounded-2xl"
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full cursor-pointer"
            >
              Pilih Gambar Product
            </button>
          </div>
          <div className="w-full flex flex-col gap-4">
            <TextInput
              label="Product Name"
              name="product_name"
              type="text"
              placeholder="Input your Product Name"
              defaultValue={state?.product_name}
              ref={productNameElement}
              errors={state?.errors?.product_name}
            />

            <TextInput
              label="Product Price"
              name="product_price"
              type="text"
              placeholder="Input your Product Price"
              defaultValue={state?.product_price}
              ref={priceElement}
              errors={state?.errors?.product_price}
            />

            <KategorySelector
              name="kategory_id"
              ref={kategoryElement}
              onChange={onKategoryChangeHandler}
              defaultValue={categoryid}
              data={kategoryListSelected}
            />
          </div>
        </div>

        <TextAreaInput
          label="Product Description"
          name="product_description"
          placeholder="Input your Product Description"
          defaultValue={state?.product_description}
          ref={descriptionElement}
          errors={state?.errors?.product_description}
        />
        <ToastContainer />
      </div>
      <SaveCancelButton
        isPending={isPending}
        onCancel={() => redirect("/product")}
      />
    </form>
  );
};

const ExistingProduct = ({ productDataObj }) => {
  const {
    productClicked,
    setProductClicked,
    bisnisIdSelected,
    kategoryListSelected,
    productListFiltered,
    setProductListFiltered,
  } = useAddProductContext();

  return (
    <div className="_flex_col">
      <LabelWithNumber
        label="Existing Product"
        number={productListFiltered.length}
      />
      <ProductSearchForm
        className={`border-b-1 border-slate-500 _flex_row items-center w-full bg-white relative`}
      />
      <div className="text-sm border-b-1 border-slate-400 bg-white _flex_row justify-between items-center">
        <FilteredButton
          productDataObj={productDataObj}
          bisnisIdSelected={bisnisIdSelected}
          kategoryListSelected={kategoryListSelected}
          setProductListFiltered={setProductListFiltered}
        />
        <span className="w-full px-4">Click Product Below To Update </span>
      </div>

      {productListFiltered.length === 0 && (
        <span className="p-4 w-full text-center">Product Not Found</span>
      )}

      {productListFiltered?.map((product) => (
        <ProductItem
          product={product}
          key={product.id}
          productClicked={productClicked}
          setProductClicked={setProductClicked}
        />
      ))}
    </div>
  );
};

const KategorySelector = ({ name, ref, onChange, defaultValue, data }) => {
  return (
    <div className="My-Input-Wrapper">
      <label className="w-full ml-4">Choose Kategory</label>
      <div className="relative w-full">
        <select
          name={name}
          ref={ref}
          onChange={onChange}
          defaultValue={defaultValue}
          className="My-Input"
        >
          {data?.map((kategory) => {
            return (
              <option value={kategory.id} key={kategory.id} className="py-6">
                {kategory.kategory_name}
              </option>
            );
          })}
        </select>
        <SelectRightIcon />
      </div>
    </div>
  );
};

const BisnisSelector = ({
  name,
  ref,
  onChange,
  defaultValue,
  disabled,
  data,
}) => {
  return (
    <div className="My-Input-Wrapper">
      <label className="w-full ml-4">Choose Bisnis</label>
      <div className="relative w-full">
        <select
          name={name}
          ref={ref}
          onChange={onChange}
          defaultValue={defaultValue}
          disabled={disabled}
          className="My-Input"
        >
          {data?.map((bisnis) => {
            return (
              <option value={bisnis.id} key={bisnis.id} className="py-6">
                {bisnis.businnessName}
              </option>
            );
          })}
        </select>
        <SelectRightIcon />
      </div>
    </div>
  );
};

const HiddenInput = ({ name, ref }) => {
  return <input type="hidden" name={name} ref={ref} />;
};

const TextAreaInput = ({
  label,
  name,
  placeholder,
  defaultValue,
  ref,
  errors,
}) => {
  return (
    <div className="My-Input-Wrapper">
      <label className="w-full ml-4">{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        ref={ref}
        className="My-Input"
      />
      <span className="text-sm text-red-500 w-full ml-4">
        {errors && <SetErrorList errorArray={errors} />}
      </span>
    </div>
  );
};

const TextInput = ({
  label,
  name,
  type,
  placeholder,
  defaultValue,
  ref,
  errors,
}) => {
  return (
    <div className="My-Input-Wrapper">
      <label className="w-full ml-4">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        ref={ref}
        className="My-Input"
      />
      <span className="text-sm text-red-500 w-full ml-4">
        {errors && <SetErrorList errorArray={errors} />}
      </span>
    </div>
  );
};

const SaveCancelButton = ({ isPending, onCancel }) => {
  return (
    <div className="_flex_row justify-between">
      <button
        className="w-full text-center p-8 bg-red-500 text-white cursor-pointer"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isPending}
        className="w-full text-center p-8 bg-blue-500 text-white font-semibold cursor-pointer"
      >
        {isPending ? "Please Wait ..." : "Save"}
      </button>
    </div>
  );
};

const FilteredButton = ({
  bisnisIdSelected,
  productDataObj,
  kategoryListSelected,
  setProductListFiltered,
}) => {
  const [idSelected, setIdSelected] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative text-2xl border-r-1 p-4 border-slate-300 hover:bg-slate-100  w-20
      bg-white text-slate-950 justify-center _flex_row"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <MdFilterList className="cursor-pointer" />
      <ul
        className={`absolute left-0 top-[56px] bg-white border-r-1 border-t-1 border-slate-300 w-[250px] flex-col ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <li className="px-4 py-3  border-b -1 border-slate-300 text-base bg-black text-white">
          Filter by Kategory
        </li>
        {kategoryListSelected?.map((kategory, idx) => (
          <li
            className={`px-4 py-3  border-b -1 border-slate-300  
              ${
                idSelected === kategory.id
                  ? "bg-slate-100"
                  : "cursor-pointer bg-white hover:bg-slate-100"
              }
              text-base  _flex_row justify-between`}
            key={idx}
            onClick={() => {
              setProductListFiltered(
                getProductByKategoryId(productDataObj, kategory.id)
              );
              setIdSelected(kategory.id);
              setIsOpen(false);
            }}
          >
            <span className="w-full">{kategory.kategory_name}</span>
            <FaChevronRight
              className={`${idSelected === kategory.id ? "flex" : "hidden"}`}
            />
          </li>
        ))}
        <li
          className={`px-4 py-3  border-b -1 border-slate-300  
              ${
                idSelected === 0
                  ? "bg-slate-100"
                  : "cursor-pointer bg-white hover:bg-slate-100"
              }
              text-base  _flex_row justify-between`}
          onClick={() => {
            setProductListFiltered(
              getProductByBisnisId(productDataObj, bisnisIdSelected)
            );
            setIdSelected(0);
            setIsOpen(false);
          }}
        >
          <span className="w-full">All Kategory</span>
          <FaChevronRight
            className={`${idSelected === 0 ? "flex" : "hidden"}`}
          />
        </li>
      </ul>
    </div>
  );
};

const ProductSearchForm = ({ className }) => {
  return (
    <form className={className}>
      <IoSearchOutline className="text-3xl left-4 absolute" />
      <input
        name="search"
        type="text"
        placeholder="Search ..."
        className="w-full px-14 py-4 border-0 text-2xl"
      />
    </form>
  );
};

const ProductItem = ({ product, productClicked, setProductClicked }) => {
  const timeStamp = new Date().getTime();
  return (
    <li
      className={`border-b-1 border-slate-400 _flex_row justify-between text-lg`}
    >
      <div
        className={`_flex_row gap-4 w-full items-center ${
          productClicked?.id === product.id
            ? "bg-black text-white"
            : "bg-white hover:bg-blue-100  cursor-pointer"
        }`}
        onClick={() => {
          setProductClicked(product);
        }}
      >
        <span className="pl-4">
          <Image
            src={product.product_url}
            width={40}
            height={40}
            alt={product.product_url}
            className="w-full rounded-full"
          />
        </span>
        <span className="truncate_1 w-full text-sm py-4">
          {product.product_name}
        </span>
      </div>
      <span
        className="text-2xl border-l-1 p-4 border-slate-300 hover:bg-blue-100  w-20
      bg-white text-slate-400 text-center justify-center _flex_row cursor-pointer"
      >
        <RiDeleteBin6Line />
      </span>
    </li>
  );
};

function ImageSelectorModal({ isOpen, onCancel, setDefaultUrl }) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    async function getImageUrl() {
      setIsLoading(true);
      const imageUrl = await BrowseImage();
      setImageList(imageUrl);
      setIsLoading(false);
    }
    getImageUrl();
  }, []);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        isOpen ? "visible bg-black/25" : "invisible"
      }`}
    >
      <div
        className={` bg-white rounded-xs shadow p-12 transition-all relative border-1 border-slate-400 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        // onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-between items-center">
          <div className="w-full flex flex-col space-y-4">
            <span className="text-lg font-semibold">
              Silahkan pilih gambar product .....
            </span>
            {isLoading ? (
              "Loading ..."
            ) : (
              <div className="grid grid-cols-6 gap-y-4 gap-x-4 max-h-[500px] overflow-auto w-full">
                {imageList?.map((imageurl) => (
                  <div
                    key={imageurl}
                    className="w-full cursor-pointer rounded-lg hover:border-blue-500 border-1 border-slate-400 p-2"
                    onClick={() => {
                      setDefaultUrl(imageurl);
                      onCancel();
                    }}
                  >
                    <Image
                      src={imageurl}
                      width={100}
                      height={100}
                      alt={imageurl}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full flex flex-row justify-end">
            <button
              type="button"
              className="bg-red-500 rounded-lg py-2 px-4 text-white font-semibold mt-4 cursor-pointer mx-2"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductFormLayout;
