import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENDPOINTS } from '../@config/endpoints';
import { ContactEntry } from '../@models/contact-entry.model';
import { AppConfig } from '../@config/config';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  http = inject(HttpClient);

  getAllContacts(): Observable<ContactEntry[]> {
    return this.http.get<ContactEntry[]>(ENDPOINTS.CONTACTS.contacts());
  }

  getTotalContacts(): Observable<number> {
    return this.http.get<number>(ENDPOINTS.CONTACTS.getTotalContacts()).pipe(map((response: any) => response.personCount))
  }

  loadNext(pageIndex: number, pageSize = AppConfig.PageSize): Observable<ContactEntry[]> {

    return this.http.get<ContactEntry[]>(ENDPOINTS.CONTACTS.getContacts(pageIndex, pageSize));
  }

  saveContact(payload: ContactEntry): Observable<ContactEntry> {
    debugger
    return this.http.post<ContactEntry>(ENDPOINTS.CONTACTS.contacts(), payload);
  }
}
