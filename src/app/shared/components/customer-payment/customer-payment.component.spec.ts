import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomerPaymentComponent } from './customer-payment.component';

describe('CustomerPaymentComponent', () => {
  let component: CustomerPaymentComponent;
  let fixture: ComponentFixture<CustomerPaymentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
