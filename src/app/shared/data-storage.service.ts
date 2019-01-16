import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Resources } from './resources';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService) {}

  storeRecipes() {
    const req = new HttpRequest(
      'PUT',
      Resources.url + '/recipes.json',
      this.recipeService.getRecipes(),
      { reportProgress: true }
    );
    return this.httpClient.request(req);
  }

  getRecipes() {
    this.httpClient.get<Recipe[]>(Resources.url + '/recipes.json').pipe(map((recipes) => {
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
