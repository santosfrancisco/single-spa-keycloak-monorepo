import { doLogout, getUsername } from "@francisco/auth";
import { navigateToUrl } from "single-spa";
import * as SC from "./styles";

const Root = (props) => {
  return (
    <SC.Container>
      <ul>
        <li onClick={() => navigateToUrl("/")}>Home</li>
        <li onClick={() => navigateToUrl("/app-a/route-a")}>App-a/route-a</li>
        <li onClick={() => navigateToUrl("/app-a/route-b")}>App-a/route-b</li>
        <li onClick={() => navigateToUrl("/app-b/route-a")}>App-b/route-a</li>
        <li onClick={() => navigateToUrl("/app-b/route-b")}>App-b/route-b</li>
      </ul>
      <ul>
        <li onClick={() => doLogout()}>({getUsername()}) Logout</li>
      </ul>
    </SC.Container>
  );
};

export default Root;
