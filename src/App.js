import React, {useEffect, useState} from "react";
import Recipe from './Recipe';
import './App.css';

const App = () => {

  // These could be protected so public won't see the keys
  const APP_ID = "a270486d";
  const APP_KEY = "efb33eaca01ba520264f19267b25f887";

  // Use this state to get all recipes from API
  const [recipes, setRecipes] = useState([]);

  // Use this state to get specific recipe from what's searched
  const [search, setSearch] = useState("");

  // Use this state to set the final search query after the button has been clicked
  const [query, setQuery] = useState("chicken");

  // The second argument is included so that the useEffect runs only when the variable in the array changes
  // query will change onSubmit, when user clicks submit button
  // If the array is left blank, useEffect only runs once when the page renders
  useEffect( () => {
    getRecipes();
  }, [query])

  // Adding await because an external API is being used and it won't come back instantly
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    // Prevents the page from refreshing everytime you enter in the search bar
    e.preventDefault();
    setQuery(search);

    // Reset search bar to empty after the submit button is clicked
    setSearch('');
  }

  return(
    <div className = "App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {/* Getting each individual recipe from the array of recipes and returning the html */}
      <div className = "recipes">
        {recipes.map(recipe =>(
          <Recipe
            key = {recipe.recipe.label}
            title = {recipe.recipe.label}
            calories = {recipe.recipe.calories}
            image = {recipe.recipe.image}
            ingredients = {recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
