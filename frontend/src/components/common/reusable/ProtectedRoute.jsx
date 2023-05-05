import { Redirect, Route } from "react-router-dom";
import withLayout from "../../../helper/hoc/withLayout";
import NotFoundScreen from "../../../screens/NotFoundScreen";

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  userRole,
  allowedRoles,
  ...rest
}) => {
  const renderComponent = (props) => {
    if (allowedRoles.includes(userRole)) return <Component {...props} />;
    return <NotFoundScreen />;
  };
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? renderComponent(props) : <Redirect to="/login" />
      }
    />
  );
};

export default withLayout(ProtectedRoute);
