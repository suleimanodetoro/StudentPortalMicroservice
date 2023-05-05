import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default PublicRoute;
