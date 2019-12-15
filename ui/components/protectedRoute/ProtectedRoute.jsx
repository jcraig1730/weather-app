import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '../../react-auth0-spa.js';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth0();
  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated === true ? (
        <Component props={rest} />
      ) : (
        <Redirect to="/" />
      ))}
    />
  );
};

export default ProtectedRoute;
