import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate,
  component: Component,
  ...props
}) => {
  const user = 'a';
  return (
    <ReactDOMRoute
      {...props}
      render={({ location }) => (true ? (
        <Component />
      ) : (
        <Redirect
          to={{
            pathname: isPrivate ? '/' : '/',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

export default Route;
