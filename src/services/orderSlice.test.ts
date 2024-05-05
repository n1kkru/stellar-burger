import {expect, test, describe} from '@jest/globals';
import orderSlice, { OrderStateInterface, addOrder, resetOrder } from './orderSlice';

describe('тесты синхронных экшенов orderSlice', () => {
  const newOrder = {
    _id: '123',
    status: 'done',
    name: 'СуперПуперБургер',
    createdAt: "2024-04-18T11:21:20.611Z", 
    updatedAt: "2024-04-23T09:09:16.434Z",
    number: 111555,
    ingredients: ["булочка с сосискою", "чай", "пряники до чаю"]
  };
  // начальное состояние, которое будем менять в тестах
  const initialState: OrderStateInterface = {
    orderRequest: false,
    isLoading: false,
    feeds: [],
    error: '',
    orderModalData: newOrder,
    orderData: null
  };

  test('добавить заказ addOrder', () => {
    const newState = orderSlice(initialState, addOrder(newOrder));
    const { feeds } = newState;
    expect(feeds).toEqual([newOrder]);
  })

  test('удалить даные заказа', () => {
    const newState = orderSlice(initialState, resetOrder());
    expect(newState.orderModalData).toEqual(null);
  })
})
