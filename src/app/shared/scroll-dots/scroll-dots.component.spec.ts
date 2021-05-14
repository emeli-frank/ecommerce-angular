import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScrollDotsComponent } from './scroll-dots.component';

describe('ScrollDotsComponent', () => {
  let component: ScrollDotsComponent;
  let fixture: ComponentFixture<ScrollDotsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollDotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
