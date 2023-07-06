import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEntryComponent } from './item-entry.component';

describe('ItemEntryComponent', () => {
  let component: ItemEntryComponent;
  let fixture: ComponentFixture<ItemEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ItemEntryComponent]
    });
    fixture = TestBed.createComponent(ItemEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
