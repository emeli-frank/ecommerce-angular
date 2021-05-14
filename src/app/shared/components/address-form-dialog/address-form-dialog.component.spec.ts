import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddressFormDialogComponent } from './address-form-dialog.component';

describe('AddressFormDialogComponent', () => {
  let component: AddressFormDialogComponent;
  let fixture: ComponentFixture<AddressFormDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
