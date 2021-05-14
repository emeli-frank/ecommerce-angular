import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogScaffoldComponent } from './dialog-scaffold.component';

describe('DialogScaffoldComponent', () => {
  let component: DialogScaffoldComponent;
  let fixture: ComponentFixture<DialogScaffoldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogScaffoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogScaffoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
