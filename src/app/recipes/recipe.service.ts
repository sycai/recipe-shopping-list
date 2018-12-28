import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe 1', 'This is simply a test 1', 'https://api.norecipes.com/wp-content/'
    + 'uploads/2018/08/teriyaki-chicken-recipe_007.jpg'),
    new Recipe('A Test Recipe 2', 'This is simply a test 2', 'https://api.norecipes.com/wp-content/'
    + 'uploads/2018/08/teriyaki-chicken-recipe_007.jpg')
  ];

  getRecipes() {
    // Defensive copy
    return this.recipes.slice();
  }
}
