import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../../public/data.json"; // Assuming the JSON is in src/

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const selectedRecipe = data.find((item) => item.id === parseInt(id));
    setRecipe(selectedRecipe);
  }, [id]);

  if (!recipe) {
    return <p className="text-center text-gray-500">Recipe not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-md">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-md"
      />
      <h1 className="text-3xl font-bold mt-4">{recipe.title}</h1>
      <p className="text-gray-600 mt-2">{recipe.summary}</p>

      <h2 className="text-2xl font-semibold mt-6">Ingredients</h2>
      <ul className="list-disc list-inside mt-2">
        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index} className="text-gray-700">{ingredient}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-6">Instructions</h2>
      <ol className="list-decimal list-inside mt-2 space-y-2">
        {recipe.instructions?.map((step, index) => (
          <li key={index} className="text-gray-700">{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
