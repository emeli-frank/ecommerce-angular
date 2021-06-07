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

  control: FormControl;

  constructor() { }

  ngOnInit(): void {
    if (this.value == null) {
      throw 'The input field \'value\' is required';
    }

    this.control = new FormControl(this.value);

    this.control.valueChanges.subscribe((valueStr: string) => {
      const value = +valueStr;

      if (isNaN(value)) {
        return;
      }

      this.value = value;
      this.changed.emit(value);
    });
  }

  add() {
    this.value++;
    this.changed.emit(this.value);
  }

  subtract() {
    this.value--;
    this.changed.emit(this.value);
  }

}
