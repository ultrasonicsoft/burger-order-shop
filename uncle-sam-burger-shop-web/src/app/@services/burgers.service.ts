import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BurgerEntry } from '../@models/burger-entry.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BurgersService {

  burgers: string = '/assets/burgers.db.json';

  http = inject(HttpClient);

  getBurgers(): Observable<BurgerEntry[]> {
    return this.http.get<BurgerEntry[]>(this.burgers).pipe(
      map((response: any) => response.burgers)
    );
  }
}
