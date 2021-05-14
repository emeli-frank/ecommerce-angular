import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavDrawerComponent } from './nav-drawer.component';

describe('NavDrawerComponent', () => {
  let component: NavDrawerComponent;
  let fixture: ComponentFixture<NavDrawerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
