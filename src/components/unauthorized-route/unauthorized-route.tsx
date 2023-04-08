import { FC }  from 'react';
import { useSelector } from "../../services/types/index";
import { useLocation, Navigate } from 'react-router-dom';
import { TRouteProps } from '../../services/types/data';

export const UnauthorizedRoute: FC<TRouteProps> = ({ element }) => {
  const location = useLocation();
  const { email, name } = useSelector((store) => store.user.user);

  if (email !== "" && name !== "") {
    return <Navigate to={location.state?.from?.pathname || '/'} replace state={{ from: location }} />;
  }

  return <>{element}</>;
};
