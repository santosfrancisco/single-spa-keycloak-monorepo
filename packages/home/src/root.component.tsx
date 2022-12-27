import { Router } from "@francisco/commons";
import { Button } from "@francisco/ui";
import { hasSomeRole, hasEveryRole } from "@francisco/auth";
import { navigateToUrl } from "single-spa";
import * as SC from "./styles";

const { BrowserRouter, Route, Switch } = Router;

const HomePage = () => {
  return (
    <SC.Wrapper>
      <SC.Title>Home</SC.Title>
      <SC.Text>Welcome!</SC.Text>
      {hasSomeRole(["app-a-route-a"]) && (
        <Button
          theme="secondary"
          onClick={() => navigateToUrl("/app-a/route-a")}
        >
          Navegar para o APP-A
        </Button>
      )}
      {hasSomeRole(["app-b-route-a"]) && (
        <Button
          theme="secondary"
          onClick={() => navigateToUrl("/app-b/route-a")}
        >
          Navegar para o APP-B
        </Button>
      )}
      {hasEveryRole(["app-a-route-a", "app-b-route-a"]) && (
        <>
          <SC.Text>
            Para ver essa sessão é preciso ter ambas as roles "app-a-route-a" e
            "app-b-route-a"
          </SC.Text>
          <Button
            theme="secondary"
            onClick={() => navigateToUrl("/app-a/route-a")}
          >
            Navegar para o APP-A
          </Button>
          <Button
            theme="secondary"
            onClick={() => navigateToUrl("/app-b/route-a")}
          >
            Navegar para o APP-B
          </Button>
        </>
      )}
    </SC.Wrapper>
  );
};

const Root = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
