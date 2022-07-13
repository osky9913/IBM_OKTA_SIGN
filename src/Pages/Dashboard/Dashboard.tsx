import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { UserClaims } from "@okta/okta-auth-js";
import { Button } from "react-bootstrap";
import TableComponent from "../../Components/TableComponent/TableComponent";
import { WikiShowComponent } from "../../Components/WikiShowComponent/WikiShowComponent";
import { OKTA_REDIRECT_HOME_PAGE_SIGNOF } from "../../Services/pageConstants";

const Dashboard = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState<null | UserClaims>(null);
  const logout = async () => {
    // Will redirect to Okta to end the session then redirect back to the configured `postLogoutRedirectUri`
    await oktaAuth.signOut({
      postLogoutRedirectUri: OKTA_REDIRECT_HOME_PAGE_SIGNOF,
    });
  };

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <p>
          Below is the information from your ID token which was obtained during
          the &nbsp;
          <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">
            PKCE Flow
          </a>{" "}
          and is now stored in local storage.
        </p>
        <p>
          This route is protected with the <code>&lt;SecureRoute&gt;</code>{" "}
          component, which will ensure that this page cannot be accessed until
          you have authenticated.
        </p>
      </div>
      <TableComponent userInfo={userInfo} />
      <WikiShowComponent userInfo={userInfo} />

      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
