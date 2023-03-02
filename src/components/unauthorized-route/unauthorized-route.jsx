import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const UnauthorizedRoute = ({ element }) => {
  const location = useLocation();
  const user = useSelector((store) => store.user.user);
//   const profile = useSelector((state) => state.profileReducer.profile);

  if (user) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace state={{ from: location }} />;
  }

  return element;
};

// export default UnauthorizedRoute;

UnauthorizedRoute.propTypes = {
  element: PropTypes.element.isRequired
};