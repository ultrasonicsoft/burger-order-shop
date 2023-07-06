import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'orders',
    loadComponent: () => import('./@pages/orders/orders.component').then(m => m.OrdersComponent)
  },
  {
    path: 'contacts',
    loadComponent: () => import('./@pages/contacts/contacts.component').then(m => m.ContactsComponent)
  },
  {
    path: '',
    redirectTo: '/orders',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
