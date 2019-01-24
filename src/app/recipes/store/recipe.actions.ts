import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = 'SET_RECIPES';
export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export const ADD_RECIPE = 'ADD_RECIPE';
export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: {id: number, recipe: Recipe}) {}
}

export const DELETE_RECIPE = 'DELETE_RECIPE';
export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export const STORE_RECIPES = 'STORE_RECIPES';
export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export const FETCH_RECIPES = 'FETCH_RECIPES';
export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export type RecipeActions = SetRecipes | AddRecipe | UpdateRecipe | DeleteRecipe | StoreRecipes | FetchRecipes;
