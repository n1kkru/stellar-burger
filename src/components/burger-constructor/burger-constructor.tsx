import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { postOrder, resetOrder } from '../../services/orderSlice';
import { resetConstructor } from '../../services/burgerSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector((state) => state.burgerReducers.constructorItems);
  const isLoading = useSelector( state => state.orderReducers.isLoading);
  const orderModalData = useSelector( state => state.orderReducers.orderModalData);
  const user = useSelector((state) => state.userReducers.user);

  const orderData : string[] = [];
  const onOrderClick = () => {
    if (!constructorItems.bun || isLoading) {
      return;
    }
    else if (!user) {
      navigate("/login");
    }
    orderData.push(constructorItems.bun._id);
    constructorItems.ingredients.forEach( element => orderData.push(element._id));
    dispatch(postOrder(orderData));
  };
  
  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + Number(v.price),
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isLoading}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
