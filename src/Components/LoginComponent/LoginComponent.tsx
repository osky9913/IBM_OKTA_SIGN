import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import {
  PROFILE_PAGE,
  OKTA_REDIRECT_HOME_PAGE_SIGNOF,
} from "../../Services/pageConstants";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
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
      <div>
        <Button onClick={login}>Okta Login</Button>
      </div>
    );
  } else {
    return (
      <div>
        <div>"You are already logged in "</div>
        <Button>
          <Link to="/profile" style={{ color: "#FFF" }}>
            Profile page
          </Link>
        </Button>
        <Button onClick={logout}>Logout</Button>
      </div>
    );
  }
};
export default LoginComponent;
