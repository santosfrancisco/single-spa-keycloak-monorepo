import { Router } from "@francisco/commons";
import { Button } from "@francisco/ui";
import { hasRealmRole } from "@francisco/auth";
import { AppProps } from "single-spa";
import * as SC from "./styles";

const { BrowserRouter, Switch, Route, Link } = Router;
const Root = (props: AppProps) => {
  return (
    <BrowserRouter basename="app-a">
      <Switch>
        <Route
          exact
          path="/route-a"
          roles={["app-a-route-a"]}
          component={({ history }) => (
            <>
              <SC.Wrapper>
                <SC.Title>APP A - ROUTE A</SC.Title>
                <Button theme="secondary" onClick={() => history.goBack()}>
                  Voltar
                </Button>
              </SC.Wrapper>
              <Link to="/route-b">Go to /app-a/route-b</Link>
              {hasRealmRole(["app-b-route-a"]) ? (
                <div style={{ marginTop: 32 }}>
                  <Button
                    theme="secondary"
                    onClick={() =>
                      props.singleSpa.navigateToUrl("/app-b/route-a")
                    }
                  >
                    Go to APP B
                  </Button>
                </div>
              ) : (
                "You do not have permission to see the 'Go to APP B' button"
              )}
            </>
          )}
        />
        <Route
          exact
          path="/route-b"
          roles={["app-a-route-b"]}
          component={({ history }) => (
            <>
              <SC.Wrapper>
                <SC.Title>APP A - ROUTE B</SC.Title>
                <Button theme="secondary" onClick={() => history.goBack()}>
                  Voltar
                </Button>
              </SC.Wrapper>
              <Link to="/route-a">Go to /app-a/route-a</Link>
            </>
          )}
        />
        <Route
          path="*"
          component={(props) => (
            <div>
              <h1>404 - Not found</h1>
              <p>{props.location.pathname}</p>
            </div>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
