"use client";
import { useContext, useState, createContext } from "react";

const ProductPageContext = createContext();

export const ProductPageProvider = ({ children }) => {
  const [productClicked, setProductClicked] = useState({});

  const contextPageData = {
    productClicked,
    setProductClicked,
  };

  return (
    <ProductPageContext.Provider value={contextPageData}>
      {children}
    </ProductPageContext.Provider>
  );
};

export const useProductPageContext = () => {
  return useContext(ProductPageContext);
};

export default ProductPageContext;
