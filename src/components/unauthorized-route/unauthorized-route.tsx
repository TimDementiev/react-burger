import { FC }  from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { TRouteProps } from '../../services/types/data';

export const UnauthorizedRoute: FC<TRouteProps> = ({ element }) => {
  const location = useLocation();
  const user = useSelector((store:any) => store.user.user);

  if (user) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace state={{ from: location }} />;
  }

  return <>{element}</>;
};
