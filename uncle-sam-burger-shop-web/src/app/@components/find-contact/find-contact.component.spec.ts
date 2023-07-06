import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindContactComponent } from './find-contact.component';

describe('FindContactComponent', () => {
  let component: FindContactComponent;
  let fixture: ComponentFixture<FindContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FindContactComponent]
    });
    fixture = TestBed.createComponent(FindContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
