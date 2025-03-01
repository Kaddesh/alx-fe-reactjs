import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  favorites: [],
  recommendations: [],

  // 🔍 Update search term
  setSearchTerm: (term) => set({ searchTerm: term }),

  // 🍲 Recipe CRUD
  addRecipe: (newRecipe) => set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  deleteRecipe: (id) => set((state) => ({ recipes: state.recipes.filter(recipe => recipe.id !== id) })),
  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe)
  })),
  setRecipes: (recipes) => set({ recipes }),

  // 🔍 **Fix: Convert `filteredRecipes` into a getter function**
  getFilteredRecipes: () => {
    const { recipes, searchTerm } = get();
    return recipes.filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()));
  },

  // ⭐ Favorite Recipes
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // 🔥 **Fix: Optimize `generateRecommendations` to prevent unnecessary re-renders**
  generateRecommendations: () => {
    const { recipes, favorites, recommendations } = get();
    const newRecommendations = recipes.filter(
      (recipe) => favorites.includes(recipe.id) && Math.random() > 0.5
    );

    // Only update state if recommendations actually change
    if (JSON.stringify(newRecommendations) !== JSON.stringify(recommendations)) {
      set({ recommendations: newRecommendations });
    }
  },
}));

export default useRecipeStore;
