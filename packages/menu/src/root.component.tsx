import { doLogout, getUsername } from "@francisco/auth";
import { Menu } from "./components/Menu";
import { MenuItem } from "./components/styles";
import { MenuProvider } from "./contexts/menu";
import * as SC from "./styles";

const menuItems = [
  {
    id: "app-a",
    beautyName: "APP A",
    pk: "app-a",
    roles: ["app-a-route-a-view", "app-a-route-b-view"],
    subItens: [
      {
        beautyName: "Route a",
        link: null,
        name: "route-a",
        routerLink: "/app-a/route-a",
        roles: ["app-a-route-a-view"],
      },
      {
        beautyName: "Route b",
        link: null,
        name: "route-b",
        routerLink: "/app-a/route-b",
        roles: ["app-a-route-b-view"],
      },
    ],
  },
  {
    id: "app-b",
    beautyName: "APP B",
    pk: "app-b",
    roles: ["app-b-route-a-view", "app-b-route-b-view"],
    subItens: [
      {
        beautyName: "Route a",
        link: null,
        name: "route-a",
        routerLink: "/app-b/route-a",
        roles: ["app-b-route-a-view"],
      },
      {
        beautyName: "Route b",
        link: null,
        name: "route-b",
        routerLink: "/app-b/route-b",
        roles: ["app-b-route-b-view"],
      },
    ],
  },
];

const Root = (props) => {
  return (
    <MenuProvider>
      <SC.Container>
        <Menu items={menuItems} />
        <MenuItem onClick={() => doLogout()}>Logout ({getUsername()})</MenuItem>
      </SC.Container>
    </MenuProvider>
  );
};

export default Root;
