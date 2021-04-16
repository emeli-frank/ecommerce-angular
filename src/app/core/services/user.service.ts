import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateUser(user: User): Observable<any> {
    return this.http.put(
      `${environment.apiBaseUrl}/users/${user.id}`,
      user.toJSON(),
    );
  }
}
