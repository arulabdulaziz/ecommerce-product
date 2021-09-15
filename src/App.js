
import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import MainPage from './page/MainPage';
import NavbarComponent from './component/NavbarComponent';
import Success from "./page/Success"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Switch>
            <Route
              path="/"
              component={MainPage}
              exact
              props={{ name: "Main Page" }}
            />
            <Route path="/success" component={Success} exact />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
