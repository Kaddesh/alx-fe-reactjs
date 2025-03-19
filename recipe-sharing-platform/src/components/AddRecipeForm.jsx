import { useState } from "react";

const AddRecipeForm = ({ onAddRecipe }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (!title || !ingredients || !steps) {
      setErrors("All fields are required.");
      return;
    }

    // Validation: Ensure at least two ingredients
    const ingredientsArray = ingredients.split(",").map((item) => item.trim());
    if (ingredientsArray.length < 2) {
      setErrors("Please include at least two ingredients.");
      return;
    }

    // Create new recipe object
    const newRecipe = {
      id: Date.now(), // Unique ID
      title,
      summary: steps.substring(0, 100) + "...", // Short summary
      image: "https://via.placeholder.com/150", // Default placeholder
      ingredients: ingredientsArray,
      steps,
    };

    // Pass new recipe to parent component
    onAddRecipe(newRecipe);

    // Reset form fields
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors("");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Add New Recipe</h2>
      {errors && <p className="text-red-500 mb-3">{errors}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Preparation Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
