import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    CoreModule,
    ShoppingListModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
