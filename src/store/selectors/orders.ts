/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */

import { Recipe } from "../../@types/recipe";

/**
 * prend en parmaètre le tableau des recettes, le slug cherché
 * renvoie la recette correspondante au slug
 */
export function findRecipe(recipes: Recipe[], searchedSlug = "") {
  const recipe = recipes.find((testedRecipe) => {
    return testedRecipe.slug === searchedSlug;
  });
  return recipe;
}

/*
EXO : ecrire les tests de la fonction findRecipe :
- choisir quoi tester et écrire les assertions en français
- traduire en JS

liste des tests :
- should be defined
- should be a function
- should return a recipe based on the slug if the receipe exist in the array
- should return undefined if the given slug doen't not correspond to a recipe in the array
*/

export const getTitle = (recipes: Recipe[] = []) => {
  if (recipes.length === 0) {
    return "Pas de recettes à afficher..";
  }
  return `Voici nos ${recipes.length} délicieuses recettes`;
};
