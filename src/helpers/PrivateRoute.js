import React from 'react';
import { Route, Redirect } from "react-router-dom";


function checkToken(token) {
    let access = true;
    if (token === "undefined") {
        access = false
    }
    if (token === null){
        access = false
    }
    return access

}

function PrivateRoute({component: Component, ...rest}) {
    let token = localStorage.getItem('token');
    let tokenExists = checkToken(token);
    return (
        <Route
            {...rest}
            render={props => tokenExists ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname:'/login/',
                        state: {from: props.location}
                    }}
                />
            )}
        />
    )
}

export default PrivateRoute;