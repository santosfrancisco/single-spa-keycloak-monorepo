import { hasSomeRole } from "@francisco/auth";
import { icons } from "@francisco/ui";
import { List } from "@francisco/ui";

import { MenuItem } from "./MenuItem";

const itemHome = {
  id: "home",
  beautyName: "Home",
  routerLink: "/",
  name: "home",
  Icon: icons.FiHome,
  pk: "home",
  roles: ["default-roles-myrealm"],
};

export type MenuItemType = {
  id: string;
  renderComponent?: (item: MenuItemType) => JSX.Element;
  beautyName: string;
  routerLink?: string;
  name?: string;
  pk: string;
  roles?: string[];
};

type MenuProps = {
  items: MenuItemType[];
};

export const Menu = ({ items }: MenuProps) => {
  return (
    <List<MenuItemType>
      items={[itemHome, ...items].map((item) => ({
        ...item,
        renderComponent: (menuItem) => {
          return hasSomeRole(menuItem.roles) ? (
            <MenuItem item={menuItem} />
          ) : null;
        },
      }))}
    />
  );
};
