import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  defaultHttpOptions: { headers; observe; } = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    }),
    observe: 'response'
  };

  private userSubject: BehaviorSubject<User>;
  public user$: Observable<User>;

  public storageKeys = {
    user: 'user',
    token: 'authorization_token'
  }

  get loggedIn(): boolean {
    return !!this.userSubject.value;
  }

  constructor(private http: HttpClient) {

    let user: User;
    let json = JSON.parse(localStorage.getItem(this.storageKeys.user));
    if (!!json) {
      try {
        user = User.fromJSON(json);
      } catch (err) {
        console.error("error creating user");
        console.error(err);
      }
    } else {
      user = null;
    }

    this.userSubject = new BehaviorSubject<User>(user);
    this.user$ = this.userSubject.asObservable();
  }

  public get isLoggedInSnapshot(): boolean { return this.userSubject.value ? true : false; }

  public get user(): User { return this.userSubject.value; }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${environment.apiBaseUrl}/users/authentication`, 
      {email: email, password: password}, 
      this.defaultHttpOptions).pipe(
      tap(
        res => {
          let user: User;
          try {
            user = User.fromJSON(res.body.user);
            this.storeUserWithToken(user, res.body.auth_token);
          } catch(err) {
            throwError(err)
          }
        }
      ),
    );
  }

  logout() {
    localStorage.removeItem(this.storageKeys.user);
    localStorage.removeItem(this.storageKeys.token);
    this.userSubject.next(null);
  }

  private storeUserWithToken(user: User, token: string) {
    if (!user) {
      localStorage.setItem(this.storageKeys.user, JSON.stringify(null));
    } else {
      localStorage.setItem(this.storageKeys.user, JSON.stringify(user.toJSON()));
    }

    localStorage.setItem(this.storageKeys.token, token);
    this.userSubject.next(user);
  }

  updateUser(user: User) {
    localStorage.setItem(this.storageKeys.user, JSON.stringify(user.toJSON()));
    this.userSubject.next(user);
  }

}
