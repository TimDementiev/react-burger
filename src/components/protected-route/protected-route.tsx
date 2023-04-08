import { FC } from "react";
import { useSelector } from "../../services/types/index";
import { Navigate, useLocation } from "react-router-dom";
import { TRouteProps } from "../../services/types/data";

export const ProtectedRoute: FC<TRouteProps> = ({ element }) => {
  const location = useLocation();
  const { email, name } = useSelector((store) => store.user.user);
  const user = useSelector((store) => store.user.user);
  const isAuthSuccess = useSelector((store) => store.user.isAuthSuccess);

  if (!isAuthSuccess) {
    <div>Loading</div>;
  }

  if (email === "" && name === "") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{element}</>;
};
