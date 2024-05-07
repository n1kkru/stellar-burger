import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchGetFeeds } from '../../services/orderSlice';

export const Feed: FC = () => {
  /** -TODO: взять переменную из стора */ 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetFeeds());
  }, []);

  const orders: TOrder[] = useSelector((state) => state.orderReducers.feeds);  

  if (!orders.length) {
    return <Preloader />;
  }
  
  return <FeedUI orders={orders} handleGetFeeds={() => {dispatch(fetchGetFeeds())}} />;
};
