import Keycloak from "keycloak-js";
import { navigateToUrl } from "single-spa";

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
const initKeycloak = (onAuthenticatedCallback) => {
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
    .catch((e) => console.error("Faiô: ", e));
};
/**
 * Faz login
 */
const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5).then(successCallback).catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const getParsedToken = () => _kc.tokenParsed;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

// validate authentication when single-spa navigate
window.addEventListener("single-spa:before-routing-event", (evt) => {
  const {
    oldUrl,
    newUrl,
    // @ts-ignore
  } = evt.detail;

  if (isLoggedIn()) {
    const cb = (refreshed) => {
      if (refreshed) {
        console.log("Token was successfully refreshed");
      } else {
        console.log("Token is still valid");
      }
    };
    if (
      newUrl.split(":9090")[1].startsWith("/app-b") &&
      !hasRole(["app-b-view"])
    ) {
      return navigateToUrl(`/not-authorized/?url=${newUrl}`);
    }
    if (
      newUrl.split(":9090")[1].startsWith("/app-a") &&
      !hasRole(["app-a-view"])
    ) {
      return navigateToUrl(`/not-authorized/?url=${newUrl}`);
    }
    return updateToken(cb);
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
  getParsedToken,
};
