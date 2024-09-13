import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchGetOrders } from '../../services/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetOrders());
  }, []);
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(state => state.orderReducers.feeds);

  return <ProfileOrdersUI orders={orders} />;
};
