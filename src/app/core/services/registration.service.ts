import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  register(customer: Customer, password: string): Observable<any> {

    return this.http.post(`${environment.apiBaseUrl}/customers`, {customer: customer.toJSON(), password: password});
  }
}
