import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Router,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Progress from "./components/Progress";
import Header from "./components/Header";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "container",
});

const history = createBrowserHistory();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    isSignedIn && history.push("/dashboard");
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazy />
              </Route>
              <Route path="/">
                <MarketingLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};

export default App;
