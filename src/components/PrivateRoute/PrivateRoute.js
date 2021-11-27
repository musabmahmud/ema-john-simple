import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const musab = true;
    return (
        <Route
        {...rest}
        render={({ location }) =>
        loggedInUser.isSignIn ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: location }
                }}
            />
            )
        }
        />
    );
};

export default PrivateRoute;