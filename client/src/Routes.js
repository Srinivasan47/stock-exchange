import React from 'react';
import { Switch, Redirect, Route, Router } from 'react-router-dom';
import LoginComponent from "./page/login/LoginComponent";
import SignupComponent from "./page/signup/SignupComponent";
import DashboardComponent from "./page/dashboard/DashboardComponent";
import BuyOrderComponent from "./page/buyorder/BuyOrderDetails";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/login">
                <LoginComponent />
            </Route>
            <Route exact path="/signup">
                <SignupComponent />
            </Route>
            <Route exact path="/dashboard">
                <DashboardComponent />
            </Route>
            <Route exact path="/buy-order">
                <BuyOrderComponent />
            </Route>
            <Route exact path="/">
                <Redirect to="/login" />
            </Route>
            <Redirect to="/not-found" />
        </Switch>
    );
};

export default Routes;