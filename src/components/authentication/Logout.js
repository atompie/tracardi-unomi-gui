import React from "react";
import {Redirect} from "react-router-dom";
import {logout} from "./login";

export default function Logout() {
    logout();
    return <Redirect to="/app/login"/>
}