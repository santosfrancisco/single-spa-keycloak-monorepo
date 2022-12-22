import { Router } from "@francisco/commons"; // app-b
import { Button } from "@francisco/ui";
import * as SC from "./styles";

const { BrowserRouter, Route, Switch, Link } = Router;

const Root = (props) => {
  return (
    <BrowserRouter basename="app-b">
      <Switch>
        <Route
          exact
          path="/route-a"
          roles={["app-b-route-a-view"]}
          component={({ history }) => (
            <>
              <SC.Wrapper>
                <SC.Title>APP B - ROUTE A</SC.Title>
                <Button theme="secondary" onClick={() => history.goBack()}>
                  Voltar
                </Button>
              </SC.Wrapper>
              <Link to="/route-b">Go to /route-b</Link>
            </>
          )}
        />
        <Route
          exact
          path="/route-b"
          roles={["app-b-route-b-view"]}
          component={({ history }) => (
            <>
              <SC.Wrapper>
                <SC.Title>APP B - ROUTE B</SC.Title>
                <Button theme="secondary" onClick={() => history.goBack()}>
                  Voltar
                </Button>
              </SC.Wrapper>
              <Link to="/route-a">Go to /route-a</Link>
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
