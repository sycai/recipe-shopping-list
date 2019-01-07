import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      0,
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/4/40/Wiener_Schnitzel.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      1,
      'Big Fat Burger',
      'What else you need to say?',
      'https://c1.staticflickr.com/9/8648/15903244265_5836f98b4a_b.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 2)
      ]),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    // Defensive copy
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.find((r) => r.id === id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(recipe: Recipe) {
    const index = this.recipes.findIndex((r: Recipe) =>
      r.id === recipe.id
    );
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.getRecipes());
  }
}
