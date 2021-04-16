import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreditCard } from 'src/app/shared/models/credit-card';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  saveCreditCard(card: CreditCard): Observable<number> {
    return this.http.post(
      `${environment.apiBaseUrl}/customers/cards`,
      card.toJSON(),
    ).pipe(
      map((res: {id: number}) => res.id),
    );
  }

  getCreditCards(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/customers/cards`);
  }

  deleteCreditCard(id: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/customers/cards/${id}`);
  }
}
