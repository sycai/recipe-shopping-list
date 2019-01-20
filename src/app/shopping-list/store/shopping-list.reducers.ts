import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';

export interface State {
  ingredients: Ingredient[];
  targetItem: Ingredient;
  targetIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  targetItem: null,
  targetIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      return {
        ...state,
        ingredients: updateIngredientAt(state.ingredients.slice(), state.targetIndex, action.payload),
        targetItem: null,
        targetIndex: -1
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: deleteIngredientAt(state.ingredients.slice(), state.targetIndex),
        targetItem: null,
        targetIndex: -1
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        targetItem: state.ingredients.slice()[action.payload],
        targetIndex: action.payload
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        targetItem: null,
        targetIndex: -1
      };

    default:
      return state;
  }
}

function updateIngredientAt(ingredients: Ingredient[], index: number, newIngredient: Ingredient): Ingredient[] {
  ingredients[index] = newIngredient;
  return ingredients;
}

function deleteIngredientAt(ingredients: Ingredient[], index: number): Ingredient[] {
  ingredients.splice(index, 1);
  return ingredients;
}
