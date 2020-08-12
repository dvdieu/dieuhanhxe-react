import React from "react";
import { Route } from "react-router-dom";
import DefaultLayout from '../../layouts/DefaultLayout';

const RoutePublic = (props) => {
    const { component: Component, isAuthenticated, to, ...rest } = props;
    const Layout =
        (Component && Component.Layout) ||
        (Component.type && Component.type.Layout) ||
        DefaultLayout;
    return (
        <Route
            {...rest}
            render={(props) => (
                <Layout
                    pathname={props.location.pathname}
                >
                    <Component {...props} />
                </Layout>
            )}
        />
    );
};

export default RoutePublic;
