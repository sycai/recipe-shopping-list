import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe 1', 'This is simply a test 1', 'https://api.norecipes.com/wp-content/'
    + 'uploads/2018/08/teriyaki-chicken-recipe_007.jpg'),
    new Recipe('A Test Recipe 2', 'This is simply a test 2', 'https://api.norecipes.com/wp-content/'
    + 'uploads/2018/08/teriyaki-chicken-recipe_007.jpg')
  ];

  @Output() recipeSelected = new EventEmitter<Recipe>();

  onSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }

  constructor() { }

  ngOnInit() {
  }

}
