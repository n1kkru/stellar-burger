import {expect, test, describe} from '@jest/globals';
import userSlice, { UserState, logout, setAuthCkeck, setUser } from './userSlice';
import { TUser } from '@utils-types';

describe('тесты синхронных экшенов orderSlice', () => {
  let initialState: UserState = {
    isRegCheck: false,
    isAuthCheck: false,
    isLoading: false,
    user: null,
    error: null,
  }

  const mockUser : TUser = {
    email: "test@test.ru",
    name: "test-name"
  }

  test('проверка setAuthCkeck', () => {
    initialState = userSlice(initialState, setAuthCkeck(true));
    expect(initialState.isAuthCheck).toBe(true);
  })

  test('добавление пользователя setUser', () => {
    initialState = userSlice(initialState, setUser(mockUser));
    expect(initialState.user).toEqual(mockUser);
  })

  test('удаление пользователя logout', () => {
    initialState = userSlice(initialState, logout());
    expect(initialState.user).toBe(null);
  })
})

