import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import FavoriteButton from './FavoriteButton';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) => state.recipes.find((r) => r.id === Number(recipeId)));
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <FavoriteButton recipeId={recipe.id} />
      <EditRecipeForm recipe={recipe} />
      <button onClick={() => { deleteRecipe(recipe.id); navigate('/'); }}>Delete</button>
    </div>
  );
};

export default RecipeDetails;
