import React, { Component } from "react";
import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import AddPlayer from "./components/Players/AddPlayer";
import EditPlayer from "./components/Players/EditPlayer";
import PlayerDetails from "./components/Players/PlayerDetails";
import Login from "./components/auth/Login";
import Settings from "./components/settings/Settings";
import register from "./components/auth/register";

import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/Players/add"
                  component={UserIsAuthenticated(AddPlayer)}
                />
                <Route
                  exact
                  path="/players/:id"
                  component={UserIsAuthenticated(PlayerDetails)}
                />
                <Route
                  exact
                  path="/players/edit/:id"
                  component={UserIsAuthenticated(EditPlayer)}
                />
                <Route
                  exact
                  path="/settings"
                  component={UserIsAuthenticated(Settings)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/register"
                  component={UserIsNotAuthenticated(register)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
