import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Button } from "@francisco/ui";
import * as SC from "./styles";

const Root = (props) => {
  return (
    <BrowserRouter basename="app-b">
      <Switch>
        <Route
          exact
          path="/route-a"
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
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
