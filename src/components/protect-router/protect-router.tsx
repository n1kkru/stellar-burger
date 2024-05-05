import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import React from 'react';
import { useSelector } from '../../services/store';

type TProtectedRoute = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element
}

const ProtectedRoute = ({onlyUnAuth = false, component}: TProtectedRoute) => {
  const isAuth = useSelector(state => state.userReducers.isAuthCheck);
  const user = useSelector((state) => state.userReducers.user);
  const isLoading = useSelector((state) => state.userReducers.isLoading);
  const location = useLocation();
  
  // если идет загрузка или не проверена авторизация
  if (isLoading || !isAuth) {
    return <Preloader />
  }
  // если юзер не авторизован но это для авторизованных
  if (!user && !onlyUnAuth) {
    return <Navigate to="/login" state={{from: location}}/>;
  }
  // если юзер авторизован но это для не авторизованных
  if (onlyUnAuth && user) {
    const { from } = location.state || {from : {pathname: "/"}};
    return <Navigate to={from}/>
  }

  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component } : { component: React.JSX.Element}) => (
  <ProtectedRoute onlyUnAuth={true} component={component}/>
)
