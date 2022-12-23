import React from "react";
import { navigateToUrl } from "single-spa";
import { List, icons } from "@francisco/ui";
import { hasRealmRole } from "@francisco/auth";
import { useMenuContext } from "../contexts/menu";
import { MenuItemType } from "./Menu";
import * as SC from "./styles";

const { FiChevronDown, FiChevronRight } = icons;

export const MenuItem = ({ item }) => {
  const { Icon } = item;
  const { category, setCategory, active } = useMenuContext();
  const [openSub, setOpenSub] = React.useState(false);

  React.useEffect(() => {
    if (active) {
      if (active.startsWith(`/${item.pk}`)) {
        setOpenSub(true);
        setCategory(item.pk);
      }
    }
  }, [active]);

  React.useEffect(() => {
    setOpenSub(item.pk === category);
  }, [category, item.pk]);

  const handleOpenSub = () => {
    setCategory(item.pk);
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
          {Icon ? <Icon /> : null}
          <SC.ItemTitle>{item.beautyName}</SC.ItemTitle>
        </SC.ItemContainer>
        {item.subItens ? (
          openSub ? (
            <FiChevronDown />
          ) : (
            <FiChevronRight />
          )
        ) : null}
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
