import React, { createContext, useContext, useState } from "react";

type MenuContextType = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  active: string;
};

const MenuContext = createContext<MenuContextType>({
  category: "",
  active: "",
  setCategory: () => {},
});

export const MenuProvider = ({ children }) => {
  const [category, setCategory] = useState("");
  const [active, setActive] = useState("");

  const updateCategory = (newCategory) => {
    setCategory(newCategory);
  };

  React.useEffect(() => {
    setActive(window.location.pathname);
  }, []);

  React.useEffect(() => {
    const callback = () => {
      setActive(window.location.pathname);
    };
    window.addEventListener("single-spa:before-routing-event", callback);
    return () =>
      window.removeEventListener("single-spa:before-routing-event", callback);
  }, []);

  const values = {
    category,
    setCategory: updateCategory,
    active,
  };

  return <MenuContext.Provider value={values}>{children}</MenuContext.Provider>;
};

export const useMenuContext = () => useContext(MenuContext);
