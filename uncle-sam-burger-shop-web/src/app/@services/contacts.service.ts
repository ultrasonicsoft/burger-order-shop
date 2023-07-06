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
    return this.http.get<ContactEntry[]>(ENDPOINTS.CONTACTS.contacts());
  }

  saveContact(payload: ContactEntry): Observable<ContactEntry> {
    debugger
    return this.http.post<ContactEntry>(ENDPOINTS.CONTACTS.contacts(), payload);
  }
}
