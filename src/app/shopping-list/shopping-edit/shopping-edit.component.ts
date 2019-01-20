import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') shoppingListForm: NgForm;

  subscription: Subscription;
  editMode = false;
  targetItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
      (data: fromShoppingList.State) => {
        if (data.targetIndex > -1) {
          this.targetItem = data.targetItem;
          this.editMode = true;
          this.shoppingListForm.setValue({
            name: this.targetItem.name,
            amount: this.targetItem.amount
          });
        } else {
          this.editMode = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const item = new Ingredient(form.value['name'], form.value['amount']);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(item));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(item));
    }

    this.restoreForm();
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
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
