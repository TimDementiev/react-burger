import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  const user = useSelector((store) => store.user.user);
  const isAuthSuccess = useSelector((store) => store.user.isAuthSuccess);

  if (!isAuthSuccess) {
   <div>Loading</div>
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return element;
};

ProtectedRoute.propTypes = {
  forNonAuthUsers: PropTypes.bool,
  element: PropTypes.element.isRequired,
};
