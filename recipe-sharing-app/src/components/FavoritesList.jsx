import useRecipeStore from './recipeStore';
import { useMemo } from 'react';

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);

  const favoriteRecipes = useMemo(
    () => favorites.map((id) => recipes.find((recipe) => recipe.id === id)),
    [favorites, recipes]
  );

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.length > 0 ? (
        favoriteRecipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No favorite recipes yet!</p>
      )}
    </div>
  );
};

export default FavoritesList;
