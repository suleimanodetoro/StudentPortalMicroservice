import React, { useMemo } from "react";
import { Switch } from "react-router-dom";
import { IS_LOGIN, USER_ROLE } from "../../../constants/APP_INFO";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AssignRoutes = ({ routes = [] }) => {
  const arr = useMemo(() => routes, [routes]);
  return (
    <Switch>
      {arr.map((route, index) =>
        route.isPublic ? (
          <PublicRoute
            key={index}
            exact
            path={route.path}
            component={route.component}
            isAuthenticated={IS_LOGIN}
          />
        ) : (
          <ProtectedRoute
            key={index}
            exact
            path={route.path}
            component={route.component}
            isAuthenticated={IS_LOGIN}
            userRole={USER_ROLE}
            allowedRoles={route.allowedRoles}
          />
        )
      )}
    </Switch>
  );
};

export default AssignRoutes;
