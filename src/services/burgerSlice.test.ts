import { expect, test, describe } from '@jest/globals';
import burgerSlice, {
  BurgerStateInterface,
  addBuns,
  addIngredient,
  allIngredients,
  fetchGetIngredients,
  initialState,
  removeIngredient,
  resetConstructor
} from './burgerSlice';
import store from './store';
import { TIngredient } from '@utils-types';

const api = require('../utils/burger-api');
const mockBun: {
  _id: string;
  price: number;
  image: string;
  name: string;
} = {
  _id: '1',
  price: 500,
  image: '/image1',
  name: 'Булочка с сосискою'
};
const mockIngregients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  }
];
const mockIngredient: TIngredient = mockIngregients[0];

describe('тесты синхронных экшенов burgerSlice', () => {
  test('добавить булку addBuns', () => {
    const newState = burgerSlice(initialState, addBuns(mockBun));
    const { constructorItems } = newState;
    expect(constructorItems.bun).toEqual(mockBun);
  });

  test('добавить и удалить начинку addIngredient, removeIngredient', () => {
    let newState = burgerSlice(initialState, addIngredient(mockIngredient));
    const { constructorItems } = newState;
    expect(constructorItems.ingredients).toEqual([
      ...initialState.constructorItems.ingredients,
      mockIngredient
    ]);
    newState = burgerSlice(newState, removeIngredient(mockIngredient._id));
    expect(newState.constructorItems.ingredients).toEqual([]);
  });

  test('очистка конструктора resetConstructor', () => {
    let newState = burgerSlice(initialState, addIngredient(mockIngredient));
    newState = burgerSlice(newState, addBuns(mockBun));
    newState = burgerSlice(newState, resetConstructor());
    const { constructorItems } = newState;

    expect(constructorItems).toEqual({ bun: null, ingredients: [] });
  });
});

describe('тесты асинхронных экшенов burgerSlice', () => {
    it(' тест getIngredients', async () => {
    const getIngredientsSpy = jest
      .spyOn(api, 'getIngredientsApi')
      .mockResolvedValue({
        ingredients: mockIngregients
      });

    await store.dispatch(fetchGetIngredients());

    const { ingredients } = store.getState().burgerReducers;

    expect(ingredients).toEqual({ ingredients: mockIngregients });
    expect(getIngredientsSpy).toHaveBeenCalledTimes(1);
  });
});
