import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import {
  PROFILE_PAGE,
  OKTA_REDIRECT_HOME_PAGE_SIGNOF,
} from "../../Services/pageConstants";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

const LoginComponent = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const login = async () =>
    await oktaAuth.signInWithRedirect({ originalUri: PROFILE_PAGE });

  const logout = async () =>
    await oktaAuth.signOut({
      postLogoutRedirectUri: OKTA_REDIRECT_HOME_PAGE_SIGNOF,
    });

  if (!authState) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (!authState.isAuthenticated) {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="https://scontent.fbts10-1.fna.fbcdn.net/v/t1.6435-9/87411621_2798749500215314_5482379410923323392_n.png?_nc_cat=107&ccb=1-7&_nc_sid=174925&_nc_ohc=zYSyVFkeuCwAX8KKeGy&_nc_ht=scontent.fbts10-1.fna&oh=00_AT-oqNt0-gt47wkJ9krkYiVCV6F0AHLqgBjOCiYqLv_ApA&oe=62F2E758"
        />
        <Card.Body>
          <Card.Title>Okta Sign in data</Card.Title>
          <Card.Text>ibm123@ibmtest.com </Card.Text>
          <Card.Text>OktaTest123</Card.Text>
          <Button onClick={login}>Okta Login</Button>
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <div>
        <div>"You are already logged in "</div>
        <Button>
          <Link to="/profile" style={{ color: "#FFF", textDecoration: "none" }}>
            Profile page
          </Link>
        </Button>
        <Button onClick={logout}>Logout</Button>
      </div>
    );
  }
};
export default LoginComponent;
