import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Resources } from './resources';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService) {}

  storeRecipes() {
    return this.http.put(Resources.url + '/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get(Resources.url + '/recipes.json')
      .pipe(map((response: Response) => {
        const recipes: Recipe[] = response.json();
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }))
      .subscribe((recipes: Recipe[]) => this.recipeService.setRecipes(recipes));
  }

}
