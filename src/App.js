import React, { useState, useEffect } from "react";
import "./App.css";
import { render } from "react-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useParamsa
} from "react-router-dom";

/*
"Broken Routing" Exercise

OBJECTIVES:
1) Bug: Multiple "pages" are showing up at the same time when we only expect one at a time. Fix this.

2) Bug: Clicking through the link pages does not properly switch between the page components. Fix this.

3) Swap the order so the navigation bar is below the page content.

4) Modify the app so '/contact' shows "Contact Page" and "/contact/us" shows "Contact Page for US".

STRETCH:

1) Add a login field in App.
2) Update the app state with the username entered in the login field.
3) Pass that username down to your Home page so that it's personalized and says "Hello <username>, welcome home."

*/

export default function App() {
  return (
    <div class="App">
      <Router>
        <Nav />
        <Route path="/" component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/contact/" component={Contact} />
        <Route path="*" component={NotFound} />
      </Router>
    </div>
  );
}

function Nav() {
  return (
    <>
      <Link to="/?name=jamis">Home</Link> | <Link to="/about/red">About</Link> |{" "}
      <Link to="/contact">Contact</Link> | <Link to="/random">random</Link>
    </>
  );
}

function Home() {
  var params = new URLSearchParams(useLocation().search);
  var name = params.get("name");
  return (
    <main class="home">
      <p>Hello {name}!</p>
    </main>
  );
}

function About() {
  const color = "";
  return <p>Hey this is about me! I want </p>;
}

function Contact() {
  return <p>Contact Page</p>;
}

function NotFound() {
  return <p>Oh no! Page not found!</p>;
}
