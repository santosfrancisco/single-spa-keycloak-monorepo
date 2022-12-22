import Keycloak from "keycloak-js";

const _kc = new Keycloak({
  url: "http://localhost:8080/",
  realm: "myrealm",
  clientId: "myclient",
});

/**
 * Initializes Keycloak instance and calls the provided callback function
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback: () => any) => {
  _kc
    .init({
      onLoad: "check-sso",
      // silentCheckSsoRedirectUri:
      //   window.location.origin + "/silent-check-sso.html",
      // pkceMethod: "S256",
    })
    .then((authenticated) => {
      if (!authenticated) {
        console.log("user is not authenticated..!");
        doLogin();
      } else {
        onAuthenticatedCallback();
        console.log("user is authenticated..!");
      }
    })
    .catch((error) => console.error("Error starting keycloak: ", error));
};

/**
 * Redirects to login form.
 * @param options Login options.
 */
const doLogin = _kc.login;

/**
 * Redirects to logout.
 * @param options Logout options.
 */
const doLogout = _kc.logout;

/**
 * @returns The base64 encoded token that can be sent in the Authorization header in
 * requests to services.
 */
const getToken = () => _kc.token;

/**
 *
 * @returns true if user is logged in (has token)
 */
const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5).then(successCallback).catch(doLogin);

/**
 * @returns The preferred_username from user token
 */
const getUsername = () => _kc.tokenParsed?.preferred_username;

/**
 * Returns true if the token has at least one of the given roles.
 * @param role A realm role name.
 */
const hasRealmRole = (roles: string[]) =>
  roles.some((role) => _kc.hasRealmRole(role));

/**
 * Returns true if the token has at least one of the given roles for the resource.
 * @param roles An array of role name.
 * @param resource If not specified, `clientId` is used.
 */
const hasResourceRole = (roles: string[], resource?: string) =>
  roles.some((role) => _kc.hasResourceRole(role, resource));

/**
 * Returns true if the token has at least one of the roles provided for the domain or resource.
 * @param roles An array of role name.
 * @param resource If not specified, `clientId` is used.
 */
const hasRole = (roles: string[], resource?: string) => {
  return roles.some((r) => {
    const realmRoles = _kc.hasRealmRole(r);
    const resourceRoles = _kc.hasResourceRole(r, resource);
    return realmRoles || resourceRoles;
  });
};

// listener that validate authentication when single-spa navigate
window.addEventListener("single-spa:before-routing-event", (evt) => {
  if (isLoggedIn()) {
    const callback = (refreshed) => {
      if (refreshed) {
        console.log("Token was successfully refreshed");
      } else {
        console.log("Token is still valid");
      }
    };
    return updateToken(callback);
  }
  console.log("User is not logged in");
  return doLogin();
});

export {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
  hasRealmRole,
  hasResourceRole,
};
