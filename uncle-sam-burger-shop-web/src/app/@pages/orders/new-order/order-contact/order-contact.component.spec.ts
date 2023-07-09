import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderContactComponent } from './order-contact.component';

describe('OrderContactComponent', () => {
  let component: OrderContactComponent;
  let fixture: ComponentFixture<OrderContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OrderContactComponent]
    });
    fixture = TestBed.createComponent(OrderContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
