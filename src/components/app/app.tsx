import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ReactNode, useEffect } from 'react';
import { OnlyAuth, OnlyUnAuth } from '../protect-router/protect-router';
import { useDispatch } from '../../services/store';
import { getUserThunk } from '../../services/userSlice';

const App = (): ReactNode => {
  const dispatch = useDispatch();
	const location = useLocation();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getUserThunk());
  }, []);

  return (
      <div className={styles.app}>
        <AppHeader />
        <Routes location={backgroundLocation || location}>
          <Route path='/' element={<ConstructorPage  />} />
          <Route path='/login' element={<OnlyUnAuth component={<Login />}/>} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/feed/:number'
            element={<OrderInfo />}
          />
          <Route path='/register' element={<OnlyUnAuth component={<Register />} />}/>
          <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword />} /> } />
          <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
            <Route
              path='/profile/orders/:number'
              element={<OrderInfo />}
            />
          <Route
            path='/ingredients/:id'
            element={<IngredientDetails />}
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>

        {backgroundLocation &&
          <Routes>
            <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента'>
                <IngredientDetails />
              </Modal>
            }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal title='Детали заказа'>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/feed/:number'
              element={
                  <Modal title='Детали заказа'>
                    <OrderInfo />
                  </Modal>
              }
            />
          </Routes>
        }
      </div>
  );
};

export default App;
