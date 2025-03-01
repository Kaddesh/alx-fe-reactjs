import { useEffect } from 'react';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const favorites = useRecipeStore((state) => state.favorites);
  const generateRecommendations = useRecipeStore.getState().generateRecommendations; // ✅ Directly call `getState()`

  useEffect(() => {
    if (favorites.length > 0) {
      generateRecommendations(); // ✅ No more unstable dependency array issues
    }
  }, [favorites, generateRecommendations]); // ✅ Now React won't warn about changing dependencies

  return (
    <div>
      <h2>Recommended Recipes</h2>
      {recommendations.length > 0 ? (
        recommendations.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No recommendations yet!</p>
      )}
    </div>
  );
};

export default RecommendationsList;
