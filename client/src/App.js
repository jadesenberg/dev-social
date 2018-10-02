import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import store from "./store";
import { Layout } from "antd";

import PrivateRoute from "./components/common/PrivateRoute";
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Slider from "./components/layout/Slider";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import AddExperience from "./components/dashboard/AddExperience";
import AddEducation from "./components/dashboard/AddEducation";
import Profiles from "./components/profile/Profiles";

import "./css/App.css";

//check for token
if (localStorage.jwtToken) {
    //set token to header
    setAuthToken(localStorage.jwtToken);
    //decode token localstoreage
    const decoded = jwt_decode(localStorage.jwtToken);
    //set user and isauthenticated
    store.dispatch(setCurrentUser(decoded));

    //check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        //logout user
        store.dispatch(logoutUser());
        store.dispatch(clearCurrentProfile());
        //redirect to login
        window.location.href = "/login";
    }
}
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Layout style={{ backgroundColor: "white" }}>
                        <Slider />
                        <Header />
                        <Route path="/" exact component={Landing} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/profiles" component={Profiles} />
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/dashboard"
                                component={Dashboard}
                            />
                            <PrivateRoute
                                exact
                                path="/createprofile"
                                component={CreateProfile}
                            />
                            <PrivateRoute
                                exact
                                path="/editprofile"
                                component={EditProfile}
                            />
                            <PrivateRoute
                                exact
                                path="/addexperience"
                                component={AddExperience}
                            />
                            <PrivateRoute
                                exact
                                path="/addeducation"
                                component={AddEducation}
                            />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
