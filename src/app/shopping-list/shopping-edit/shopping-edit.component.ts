import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') shoppingListForm: NgForm;

  subscription: Subscription;
  editMode = false;
  targetIndex: number;
  targetItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.targetIndex = index;
        this.targetItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.targetItem.name,
          amount: this.targetItem.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const item = new Ingredient(form.value['name'], form.value['amount']);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.targetIndex, item);
    } else {
      this.shoppingListService.addIngredient(item);
    }

    this.restoreForm();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.targetIndex);
    this.restoreForm();
  }

  onCancel() {
    this.restoreForm();
  }

  restoreForm() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

}
