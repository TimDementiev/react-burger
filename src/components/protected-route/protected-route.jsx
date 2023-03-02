import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ({
  // forNonAuthUsers = false,
  // forNonAuthUsers,
  element
  // ...rest
}) => {
  const location = useLocation();
  const user = useSelector((store) => store.user.user);
  // const isAuthSuccess = useSelector((store) => store.user.isAuthSuccess);

  // // console.log(props);
  // // console.log(element);
  // // console.log(forNonAuthUsers);
  // console.log(location);
  // console.log(user);
  // console.log(isAuthSuccess);

  // if (!isAuthSuccess) {
  //   <div>Loading</div>;
  // }

  // if (forNonAuthUsers && user) {
  //   // const { from } = location.state || { from: { pathname: "/" } };
  //   // return <Navigate to={from} />;
  //   return <Navigate to={location.state || { from: { pathname: "/" } }} />;
  // }

  // if (!forNonAuthUsers && !user) {
  //   return <Navigate to={{ pathname: "/login", state: { from: location } }} />;
  // }

  // if (user) {
  //   return (
  //     <Navigate
  //       to={location.state?.from?.pathname || "/"}
  //       replace
  //       state={{ from: location }}
  //     />
  //   );
  // }

  // ProtectedRouteElement
  // if (!profile) {
  //   return <Navigate to="/login" replace state={{ from: location }} />;
  // }
  // if (!user && !forNonAuthUsers) {
    if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // RouteUnauthorizedUser
  // if (profile) {
  //   return <Navigate to={location.state?.from?.pathname || '/'} replace state={{ from: location }} />;
  // }
  // if (user && forNonAuthUsers) {
  //   if (user) {
  //   return (
  //     <Navigate
  //       to={location.state?.from?.pathname || "/"}
  //       replace
  //       state={{ from: location }}
  //     />
  //   );
  // }

  return element;
};

ProtectedRoute.propTypes = {
  forNonAuthUsers: PropTypes.bool,
  element: PropTypes.element.isRequired,
};
