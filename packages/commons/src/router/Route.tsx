import {
  Route as RRDRoute,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { hasSomeRole } from "@francisco/auth";
import { NotAllowed } from "./NotAllowed";

type CustomRouteProps = {
  roles?: string[];
} & RouteProps;

const validateRoles = ({ roles, ...rest }: CustomRouteProps) =>
  hasSomeRole(roles) ? (
    <RRDRoute {...rest} />
  ) : (
    <RRDRoute
      component={(props: RouteComponentProps) => <NotAllowed {...props} />}
    />
  );

export const Route = (props: CustomRouteProps) =>
  props?.roles ? validateRoles(props) : <RRDRoute {...props} />;
