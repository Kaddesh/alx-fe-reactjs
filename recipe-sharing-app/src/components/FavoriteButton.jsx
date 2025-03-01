import { useNavigate } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const FavoriteButton = ({ recipeId }) => {
  const navigate = useNavigate();

  // ✅ Handling Zustand store separately
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const isFavorite = favorites.includes(recipeId);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
    navigate("/");
  };

  return (
    <button onClick={handleFavoriteClick}>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
