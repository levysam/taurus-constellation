import React, { useCallback } from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate,
  component: Component,
  ...props
}) => {
  const { user } = useAuth();

  const isAllowed = useCallback((): boolean => {
    if (!isPrivate) {
      return true;
    }
    if (isPrivate && user) {
      return true;
    }
    return false;
  }, [isPrivate, user]);

  return (
    <ReactDOMRoute
      {...props}
      render={({ location }) => (isAllowed() ? (
        <Component />
      ) : (
        <Redirect
          to={{
            pathname: isPrivate ? '/' : '/dashboard',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

export default Route;
