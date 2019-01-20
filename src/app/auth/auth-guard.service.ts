import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.store.select['auth'].pipe(map((authState: fromAuth.State) => authState.authenticated))) {
      this.router.navigate(['/signin']);
      return false;
    }
    return true;
  }
}
