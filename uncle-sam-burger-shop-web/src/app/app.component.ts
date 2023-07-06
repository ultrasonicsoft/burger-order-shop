import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContactsService } from './@services/contacts.service';
import { OrdersService } from './@services/orders.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  mobileQuery!: MediaQueryList;
  private _mobileQueryListener: () => void;

  openSideNav = true;

  contactsService = inject(ContactsService);
  orderService = inject(OrdersService);

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    translate: TranslateService
  ) {

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.contactsService.getContacts().subscribe((response: any) => {
      console.debug('🔥 contacts response', response);
    });

    this.orderService.getOrders().subscribe((response: any) => {
      console.debug('🔥 orders response', response);
    });
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
