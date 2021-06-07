import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-count-button',
  templateUrl: './item-count-button.component.html',
  styleUrls: ['./item-count-button.component.scss']
})
export class ItemCountButtonComponent implements OnInit {

  @Input() value: number;
  @Output() changed = new EventEmitter<number>();

  private originalValue: number;
  control: FormControl;

  get modified(): boolean { return this.originalValue != this.value; }

  constructor() { }

  ngOnInit(): void {
    if (this.value == null) {
      throw 'The input field \'value\' is required';
    }

    this.originalValue = this.value;
    this.control = new FormControl(this.value);

    this.control.valueChanges.subscribe((valueStr: string) => {
      const value = +valueStr;

      if (isNaN(value)) {
        this.control.setValue(0);
        return;
      }

      this.value = value;
    });
  }

  add() {
    // this.value++;
    const value = this.value + 1;
    this.control.setValue(value);
  }

  subtract() {
    // this.value--;
    const value = this.value - 1;
    this.control.setValue(value);
  }

  emitChange() {
    this.changed.emit(this.value);
    this.originalValue = this.value;
  }

}
