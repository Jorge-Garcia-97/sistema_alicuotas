import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "../screens/login/Login";
import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
  const { isLogin } = useSelector((state) => state.auth);
  return (
    <Router>
      <div>
        {isLogin ? (
          <>
            <Switch>
              <Route path="/" component={DashboardRoutes} />
            </Switch>
          </>
        ) : (
          <>
            <Login />
          </>
        )}
      </div>
    </Router>
  );
};
