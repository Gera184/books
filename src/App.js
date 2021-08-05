import React from "react";
import Main from "./components/main/Main";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Book from "./components/book/Book";

export default () => {
  return (
    <div
      style={{
        fontFamily: "Sofia sans-serif",
        overflowX: "hidden",
        color: "white",
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/favorites" component={Book} />
          <Route exact path="/home" component={Main} />
          <Route exact path="/" component={Main} />
        </Switch>
      </Router>
    </div>
  );
};
