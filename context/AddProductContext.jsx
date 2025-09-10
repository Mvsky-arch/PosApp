"use client";
import { useContext, useState, createContext } from "react";

const AddProductContext = createContext();

export const AddProductProvider = ({ children }) => {
  const [actions, setActions] = useState("Insert");

  const [productClicked, setProductClicked] = useState({});
  const [bisnisIdSelected, setBisnisIdSelected] = useState(0);

  const [kategoryListSelected, setKategoryListSelected] = useState([]);
  const [productListFiltered, setProductListFiltered] = useState([]);

  const contextData = {
    actions,
    productClicked,
    bisnisIdSelected,
    kategoryListSelected,
    productListFiltered,
    setActions,
    setProductClicked,
    setBisnisIdSelected,
    setKategoryListSelected,
    setProductListFiltered,
  };

  return (
    <AddProductContext.Provider value={contextData}>
      {children}
    </AddProductContext.Provider>
  );
};

export const useAddProductContext = () => {
  return useContext(AddProductContext);
};

export default AddProductContext;
