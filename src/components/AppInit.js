import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import PrivateRoute from "./authentication/PrivateRoute";
import App from "./App";
import SignIn from "./authentication/SignIn";
import Logout from "./authentication/Logout";
import history from '../history';

export default function AppInit() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/app/login">
                    <SignIn/>
                </Route>
                <Route exact path="/app/logout">
                    <Logout/>
                </Route>
                <PrivateRoute path="/app">
                    <App/>
                </PrivateRoute>
            </Switch>
        </Router>
    );
}
