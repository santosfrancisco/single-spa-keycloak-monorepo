import React, { createContext, useContext, useState } from "react";

type MenuContextType = {
  isExpanded: boolean;
  toggleMenu: () => void;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  active: string;
};

const MenuContext = createContext<MenuContextType>({
  isExpanded: true,
  category: "",
  active: "",
  toggleMenu: () => {},
  setCategory: () => {},
});

export const MenuProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [category, setCategory] = useState("");
  const [active, setActive] = useState("");

  const toggleMenu = () => {
    setIsExpanded((state) => !state);
  };

  const updateCategory = (newCategory) => {
    setCategory(newCategory === category ? "" : newCategory);
  };

  React.useEffect(() => {
    if (!isExpanded) {
      setCategory("");
    }
  }, [isExpanded]);

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
    isExpanded,
    toggleMenu,
    category,
    setCategory: updateCategory,
    active,
  };

  return <MenuContext.Provider value={values}>{children}</MenuContext.Provider>;
};

export const useMenuContext = () => useContext(MenuContext);
