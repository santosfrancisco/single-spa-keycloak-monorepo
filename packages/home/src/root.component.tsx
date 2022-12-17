import React from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import { Button } from "@francisco/ui";
import { navigateToUrl } from "single-spa";
import * as SC from "./styles";

const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};
const NotAuthorizedPage = () => {
  const query = useQuery();
  return (
    <SC.Wrapper>
      <SC.Title>Not authorized</SC.Title>
      <SC.Text>
        Você não tem permissão para acessar{" "}
        {query.get("url") || "a página solicitada"}
      </SC.Text>
      <Button theme="secondary" onClick={() => navigateToUrl("/")}>
        Voltar para a home
      </Button>
    </SC.Wrapper>
  );
};

const Root = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <SC.Title>Home!</SC.Title>} />
        <Route path="/not-authorized" component={NotAuthorizedPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
