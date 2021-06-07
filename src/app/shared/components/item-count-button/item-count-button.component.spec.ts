import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCountButtonComponent } from './item-count-button.component';

describe('ItemCountButtonComponent', () => {
  let component: ItemCountButtonComponent;
  let fixture: ComponentFixture<ItemCountButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCountButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCountButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
