import { getIngredientsApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TConstructor = {
  bun: {
    _id: string;
    price: number;
    image: string | null;
    name: string;
  } | null;
  ingredients: any[];
};

export interface BurgerStateInterface {
  isInit: boolean;
  isLoading: boolean;
  ingredients: TIngredient[];
  constructorItems: TConstructor;
  ingredientData: TIngredient | null;
  error: string | null;
}

export const initialState: BurgerStateInterface = {
  isInit: false,
  isLoading: false,
  ingredients: [],
  ingredientData: null,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  error: ''
};

export const fetchGetIngredients = createAsyncThunk(
  'burger/getIngredients',
  async function () {
    const res = await getIngredientsApi();
    return res;
  }
);

/* TODO: PayloadAction<any> изменить*/
const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    },
    addBuns: (state, action: PayloadAction<any>) => {
      state.constructorItems.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.constructorItems.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ing) => ing._id !== action.payload
        );
    },
    resetConstructor: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetIngredients.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchGetIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    });
    builder.addCase(fetchGetIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = String(action.error.message);
    });
  },
  selectors: {
    selectIngredients: (state) => state.constructorItems,
    selectIsLoading: (state) => state.isLoading
  }
});

export const { selectIngredients, selectIsLoading } = burgerSlice.selectors;
export const { init, addBuns, addIngredient, removeIngredient, resetConstructor } =
  burgerSlice.actions;
export default burgerSlice.reducer;
