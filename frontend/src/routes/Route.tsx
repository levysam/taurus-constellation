import React, { useCallback } from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isAdminOnly?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate,
  isAdminOnly,
  component: Component,
  ...props
}) => {
  const { user } = useAuth();

  const isAllowed = useCallback((): boolean => {
    if (!isPrivate) {
      return true;
    }
    if (isPrivate && !user) {
      return false;
    }
    if (isAdminOnly && user.role !== 'administrator') {
      return false;
    }
    return true;
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
