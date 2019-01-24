import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/4/40/Wiener_Schnitzel.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),

    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://c1.staticflickr.com/9/8648/15903244265_5836f98b4a_b.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 2)
      ]),
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes:  action.payload.slice()
      };

    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case RecipeActions.UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.slice()[action.payload.id] = action.payload.recipe
      };

    case RecipeActions.DELETE_RECIPE:
      const recipesAfterDeletion = state.recipes.slice();
      recipesAfterDeletion.splice(action.payload, 1);
      return {
        ...state,
        recipes: recipesAfterDeletion
      };

    default:
      return state;
  }

}
