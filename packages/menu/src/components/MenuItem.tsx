import React from "react";
import { navigateToUrl } from "single-spa";
import { List } from "@francisco/ui";
import { useMenuContext } from "../contexts/menu";
import * as SC from "./styles";
import { MenuItemType } from "./Menu";
import { hasRealmRole } from "@francisco/auth";

export const MenuItem = ({ item }) => {
  const { isExpanded, toggleMenu, category, setCategory, active } =
    useMenuContext();
  const [openSub, setOpenSub] = React.useState(false);

  React.useEffect(() => {
    if (active) {
      setOpenSub(active.split("/")[1]?.startsWith(item.pk));
    }
  }, [active]);

  React.useEffect(() => {
    setOpenSub(item.pk === category);
  }, [category, item.pk]);

  const handleOpenSub = () => {
    setCategory(item.pk);
    !isExpanded && toggleMenu();
  };

  const handleNavigate = (item) => {
    navigateToUrl(item.routerLink);
  };

  const attrs = item.link
    ? {
        onClick: () => {
          window.open(item.link, "_blank", "noopener,noreferrer");
        },
      }
    : {
        onClick: () => (item.subItens ? handleOpenSub() : handleNavigate(item)),
      };

  return item.pk || item.name ? (
    <>
      <SC.MenuItem selected={!item.pk && active === item.routerLink} {...attrs}>
        <SC.ItemContainer>
          {isExpanded && <SC.ItemTitle>{item.beautyName}</SC.ItemTitle>}
        </SC.ItemContainer>
      </SC.MenuItem>

      {item.subItens?.length > 0 && openSub && (
        <SC.SubItemsContainer>
          <List<MenuItemType>
            items={item.subItens.map((item) => ({
              ...item,
              renderComponent: (menuItem) => {
                return hasRealmRole(menuItem.roles) ? (
                  <MenuItem item={menuItem} />
                ) : null;
              },
            }))}
          />
        </SC.SubItemsContainer>
      )}
    </>
  ) : null;
};
