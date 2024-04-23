import { TLoginData, TRegisterData, TUserResponse, getUserApi, loginUserApi, logoutApi, registerUserApi, updateUserApi } from "@api";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";

export const registerUserThunk = createAsyncThunk(
  'users/registerUser',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    return res
  }
)

export const loginUserThunk = createAsyncThunk(
  'users/loginUser',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user
  }
)

export const logoutUserThunk = createAsyncThunk(
  'users/logoutUser',
  async () => {
    const res = await logoutApi()
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    return res;
  }
)

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  async (user: TUser) => {
    const res = await updateUserApi(user)
    return res;
  }
)

export const getUserThunk = createAsyncThunk(
    'users/getUser',
    async (_, {dispatch}) => {
      if (localStorage.getItem('accessToken')) {
        await getUserApi()
          .then(res => dispatch(setUser(res.user)) )
          .catch(() => {
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
          })
          .finally(() => dispatch(setAuthCkeck(true)))
      } else {
        dispatch(setAuthCkeck(true));
      }
    }
)

export interface UserState {
  isRegCheck: boolean;
  isAuthCheck: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: UserState = {
  isRegCheck: false,
  isAuthCheck: false,
  isLoading: false,
  user: null,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      setAuthCkeck: (state, action: PayloadAction<boolean>) => {
        state.isAuthCheck = action.payload;
      },
      logout: (state) => {
        state.user = null;
      },
      setUser: (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
      }
  },
  selectors: {
    getAuthCheck: (state) => state.isAuthCheck,
    getUser: (state) => state.user,
    getIsLoading: (state) => state.isLoading,
  },
  extraReducers: (builder) => {
      builder.addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(loginUserThunk.rejected, (state) => {
        state.isLoading = false;
      });
      builder.addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthCheck = true;
      });

      builder.addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isRegCheck = false;
      });
      builder.addCase(registerUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.isRegCheck = false;
      });
      builder.addCase(registerUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isRegCheck = true;
      });

      builder.addCase(getUserThunk.pending, (state) => {
        state.isAuthCheck = false;
        state.isLoading = true;
      });
      builder.addCase(getUserThunk.rejected, (state) => {
          state.isAuthCheck = false;
          state.isLoading = false;
      });
      builder.addCase(getUserThunk.fulfilled, (state) => {
          state.isAuthCheck = true;
          state.isLoading = false;
      });

      builder.addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
    });
  }
});

export const { getAuthCheck, getUser, getIsLoading } = userSlice.selectors;
export const { setAuthCkeck, logout, setUser } = userSlice.actions;
export default userSlice.reducer
