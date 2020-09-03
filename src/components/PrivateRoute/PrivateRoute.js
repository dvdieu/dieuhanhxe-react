import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';
import { isSignIn } from '../../helpers/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest} render={props => (
                isSignIn() ?
                    <BasicLayout>
                        <Component {...props} />
                    </BasicLayout>
                    : <Redirect to={'/sign-in'} />
            )}
        />
    )
}

export default PrivateRoute;