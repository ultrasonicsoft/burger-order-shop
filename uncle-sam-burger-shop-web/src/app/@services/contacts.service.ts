import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../@config/endpoints';
import { ContactEntry } from '../@models/contact-entry.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  http = inject(HttpClient);

  getContacts(): Observable<ContactEntry[]> {
    return this.http.get<ContactEntry[]>(ENDPOINTS.CONTACTS.getContacts());
  }
}
