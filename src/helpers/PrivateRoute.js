import React from 'react';
import { Route, Redirect } from "react-router-dom";

let token = localStorage.getItem('token')
const fakeAuth = {
    isAuthenticated: true
}

if (token === "undefined") {
    fakeAuth.isAuthenticated = false
}

if (token == null){
     fakeAuth.isAuthenticated = false
}


function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={props => fakeAuth.isAuthenticated ? (
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