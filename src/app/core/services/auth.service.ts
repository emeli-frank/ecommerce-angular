import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  user$: Observable<User>;

  private userLocalStorageKey = 'user_data';

  get loggedIn(): boolean { return !!this.userSubject.value; }

  get isLoggedInSnapshot(): boolean { return this.userSubject.value ? true : false; }

  get user(): User { return this.userSubject.value; }

  constructor(private http: HttpClient) {

    const user: User = this.getLocalUserData().user;

    this.userSubject = new BehaviorSubject<User>(user);
    this.user$ = this.userSubject.asObservable();
  }

  // get raw user data (user and auth token) from local storage and returns
  // an object containing user<User> and token<string> or {user: null, token: null}
  // if there was an error parsing gotten data.
  private getLocalUserData(): {user: User, token: string} {
    const data = localStorage.getItem(this.userLocalStorageKey);
    try {
      const json = JSON.parse(data);
      return {user: User.fromJSON(json['user']), token: json['token']};
    } catch (e) {
      console.error(e);
      return {user: null, token: null};
    }
  }

  // updates user data in local storage
  private updateUserLocalData(user: User, token?: string) {
    if (!user) { // remove user
      localStorage.setItem(this.userLocalStorageKey, JSON.stringify(null));
    } else {
      if (token) { // update user and token
        const data = {
          user: user.toJSON(),
          token: token,
        }
        localStorage.setItem(this.userLocalStorageKey, JSON.stringify(data));
      } else { // update user only
        const data = {
          user: user.toJSON(),
          token: this.getAuthToken(),
        }
        localStorage.setItem(this.userLocalStorageKey, JSON.stringify(data));
      }
    }
  }

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
            this.updateUser(user, res.body.auth_token);
          } catch(err) {
            throwError(err)
          }
        }
      ),
    );
  }

  logout() {
    localStorage.removeItem(this.userLocalStorageKey);
    this.userSubject.next(null);
  }

  updateUser(user: User, token?: string) {
    this.updateUserLocalData(user, token);

    this.userSubject.next(user);
  }

  getAuthToken(): string {
    return this.getLocalUserData().token;
  }

}
