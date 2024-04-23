import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const paramsId = useParams();
  const ingredientsData = useSelector((state) => state.burgerReducers.ingredients);
  const ingredientData = ingredientsData.filter(s => s._id === paramsId['id'])[0];

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
