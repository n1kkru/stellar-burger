import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { fetchGetIngredients } from '../../services/burgerSlice';

export const IngredientDetails: FC = () => {
  const paramsId = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetIngredients());
  }, []);
  const ingredientsData = useSelector((state) => state.burgerReducers.ingredients);
  const ingredientData = ingredientsData.filter(s => s._id === paramsId['id'])[0];

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
