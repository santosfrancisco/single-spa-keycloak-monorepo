import { RouteComponentProps } from ".";

export const NotAllowed = (props: RouteComponentProps) => (
  <div>
    <h1>Access is not allowed! ⛔️</h1>
    <p>{props.location.pathname}</p>
  </div>
);
