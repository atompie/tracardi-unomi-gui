import React from "react";
import {Route, Redirect} from "react-router-dom";
import {getRoles, isAuth} from "./login";
import NotAllowed from "./NotAllowed";

export default function PrivateRoute({children, location, roles, ...rest}) {

    function intersect(a, b) {
        let setB = new Set(b);
        return [...new Set(a)].filter(x => setB.has(x));
    }

    const isAllowed = () => {
        // console.log(getRoles());
        // console.log(roles);
        // console.log(intersect(getRoles(), roles));
        if(intersect(getRoles(), roles).length > 0) {
            return true
        }
        return false
    }

    return (
        <Route {...rest}>
            {
                isAuth()
                    ? isAllowed() ? children : <NotAllowed/>
                    : <Redirect to={
                        {
                            pathname: '/app/login',
                            state: {from: location}
                        }
                    }/>
            }
        </Route>
    )
};
