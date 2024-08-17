import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { UserType } from '../../../../shared/schemas/userSchema';
import { AppStore } from '../store/store';
import { UsersService } from '../pages/prayers/services/users.service';
import { addUserToStore } from '../store/slices/usersSlice/usersSlice.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private currentUser: UserType | null = null;

  constructor(
    private store: Store<AppStore>,
    private usersService: UsersService
  ) {}

  login(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  checkUserOnRefresh(): Observable<UserType | null> {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      if (decodedToken && decodedToken.userId) {
        if (this.currentUser) {
          return of(this.currentUser);
        }

        return this.usersService.getUserById(decodedToken.userId).pipe(
          tap(user => {
            this.currentUser = user;
            this.store.dispatch(addUserToStore({ user }));
          }),
          catchError(error => {
            console.error('Error fetching user on refresh:', error);
            this.logout();
            return of(null);
          })
        );
      } else {
        this.logout();
        return of(null);
      }
    } else {
      return of(null);
    }
  }
}
