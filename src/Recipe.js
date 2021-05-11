import React from 'react';
import style from './recipe.module.css';

// React needs a unique identifier for each of the recipes so it can render faster
// Passing the props from the useState into the component
const Recipe = ({title, calories, image, ingredients}) => {
    return(
        <div className={style.recipe}>
            <h1>{title}</h1>
            <p>{calories}</p>
            <ol>
                {ingredients.map(ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <img className={style.image} src={image} alt=""/>
        </div>
    )
}

export default Recipe;

