import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = + params['id'];
        // The presence of 'id' indicates we are editing a recipe
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  onSubmit() {
    const id = this.editMode ? this.id : this.recipeService.getRecipes().length;
    const name = this.recipeForm.value['name'];
    const imagePath = this.recipeForm.value['imagePath'];
    const description = this.recipeForm.value['description'];
    const ingredients = this.recipeForm.value['ingredients'];

    const recipe = new Recipe(id, name, description, imagePath, ingredients);

    if (this.editMode) {
      this.recipeService.updateRecipe(recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }

    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+\d*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let name = '';
    let imagePath = '';
    let description = '';
    const ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe['ingredients']) {
        for (const item of recipe['ingredients']) {
          ingredients.push(new FormGroup({
            'name': new FormControl(item.name, Validators.required),
            'amount': new FormControl(item.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+\d*$/)
            ])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredients
    });
  }

  getIngredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
