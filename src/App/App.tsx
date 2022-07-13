import React from "react";
import Dashboard from "../Pages/Dashboard/Dashboard";
import { Route, Switch, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { oktaConfig } from "../Services/config/oktaConfig";
import LoginComponent from "../Components/LoginComponent/LoginComponent";
import { CALL_BACK_PAGE, PROFILE_PAGE } from "../Services/pageConstants";
import { Container, Row } from "react-bootstrap";

const oktaAuth = new OktaAuth(oktaConfig);

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Switch>
        <Container fluid>
          <Row className="justify-content-md-center">
            <Route path="/" exact={true} component={LoginComponent} />
            <Route path={CALL_BACK_PAGE} component={LoginCallback} />
            <SecureRoute path={PROFILE_PAGE} exact component={Dashboard} />
          </Row>
        </Container>
      </Switch>
    </Security>
  );
};
export default App;
