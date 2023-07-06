import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../@config/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  http = inject(HttpClient);

  getContacts(): Observable<any> {
    return this.http.get(ENDPOINTS.CONTACTS.getContacts());
  }
}
