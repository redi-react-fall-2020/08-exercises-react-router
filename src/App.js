import React, { useState, useEffect, Children } from "react";
import "./App.css";
import { render } from "react-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useParams,
  useHistory,
  Redirect,
  NavLink
} from "react-router-dom";

/*
"Routing 200"

LESSON PLAN:
1) Basic routing setup
2) Navlink & active style
3) Homepage (exact)
4) History (go back button)
5) Params
6) Protected Pages



*/

export default function App() {
  return (
    <div class="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/params/:username">
            <Params />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <PrivateRoute path="/private">
            <Private />
          </PrivateRoute>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const Home = () => <p> Welcome Home </p>;

const Params = () => {
  const params = useParams();
  return <p>Hello {params.username}</p>;
};

const History = () => {
  const location = useLocation();
  const history = useHistory();
  console.log("history", history);
  return (
    <p>
      You are current here "{location.pathname}",{" "}
      <button onClick={history.goBack}>Go Back</button>
    </p>
  );
};

const Private = () => <p>Secret stuff here</p>;

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route {...rest}>
      {fakeAuth.isAuthenticated ? (
        { ...children }
      ) : (
        <Redirect to="/login"></Redirect>
      )}
    </Route>
  );
};

function LoginPage() {
  let history = useHistory();

  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace("/private");
    });
  };

  return (
    <div>
      <p>You must log in to view the page at '/private'</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

function Nav() {
  return (
    <>
      <NavLink activeStyle={{ color: "blue", fontWeight: 800 }} exact to="/">
        Home
      </NavLink>{" "}
      |{" "}
      <NavLink activeStyle={{ color: "blue", fontWeight: 800 }} to="/history">
        History
      </NavLink>{" "}
      |{" "}
      <NavLink
        activeStyle={{ color: "blue", fontWeight: 800 }}
        to="/params/shauna"
      >
        Params
      </NavLink>{" "}
      |{" "}
      <NavLink activeStyle={{ color: "blue", fontWeight: 800 }} to="/private">
        Private
      </NavLink>
    </>
  );
}
