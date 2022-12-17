import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);

System.import("@francisco/auth")
  .then((UserService) => {
    System.import("@francisco/ui").then(() => {
      // Activate the layout engine once the styleguide CSS is loaded
      layoutEngine.activate();
      // start single-spa after init keycloak
      UserService.initKeycloak(() => start());
    });
  })
  .catch(() => {
    console.error("Auth não rodou");
  });
