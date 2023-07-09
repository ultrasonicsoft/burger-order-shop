import { ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContactsService } from 'src/app/@services/contacts.service';
import { ContactEntry } from 'src/app/@models/contact-entry.model';
import { EmitterService } from '@ngxs-labs/emitter';
import { ContactsState } from 'src/app/@states/contacts.state';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription, catchError, finalize, tap, throwError } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'sam-contact-list',
  standalone: true,
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  imports: [
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TranslateModule,
    MatProgressBarModule,

  ],

})
export class ContactListComponent implements OnDestroy {
  displayedColumns: string[] = ['firstName', 'lastName', 'houseNumber', 'streetAddress', 'zip', 'city'];
  dataSource!: MatTableDataSource<ContactEntry>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalContacts = 0;

  contactsService = inject(ContactsService);
  emitter = inject(EmitterService);
  cd = inject(ChangeDetectorRef);

  working = false;


  subscription = new Subscription();

  constructor() {
    this.working = true;
    this.subscription.add(this.contactsService.getTotalContacts().pipe(
      tap((totalContacts: number) => {
        this.totalContacts = totalContacts;
        this.loadContacts(1, true);
      }),
      catchError((err) => {
        return throwError(() => new Error('Could not get contact list length...please try again', err))
      })
    ).subscribe());
  }

  private loadContacts(pageIndex: number, firstLoad = false): void {
    this.working = true;
    this.subscription.add(this.contactsService.loadNext(pageIndex).pipe(
      tap((contacts: ContactEntry[]) => {
        console.debug('🔥 contacts response', contacts);
        this.emitter.action(ContactsState.loadNext).emit(contacts as any);
        this.dataSource = new MatTableDataSource(contacts);
        if (firstLoad) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }),
      catchError((err) => {
        return throwError(() => new Error('Could not load contacts...please try again', err))
      }),
      finalize(() => {
        this.working = false;
        this.cd.detectChanges();
      })
    ).subscribe());
  }

  loadNext(page: PageEvent): void {
    this.loadContacts(page.pageIndex + 1);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}