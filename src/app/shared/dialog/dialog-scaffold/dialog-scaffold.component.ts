import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-scaffold',
  templateUrl: './dialog-scaffold.component.html',
  styleUrls: ['./dialog-scaffold.component.css']
})
export class DialogScaffoldComponent implements OnInit {

  @Input() title: string = "";
  @Input() message: string | string[] = [];
  @Input() primaryButtonLabel: string = "";
  @Input() secondaryButtonLabel: string = "";
  @Input() hideSecondaryButton: boolean = false;
  @Input() isBusy: boolean = false;
  @Output() primaryClicked = new EventEmitter<any>();
  @Output() secondaryClicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    // convert to array if not already
    if (typeof this.message == 'string') {
      this.message = [this.message];
    }
  }

  submit(btn: 'primary' | 'secondary') {
    if (btn == 'primary') {
      this.primaryClicked.emit();
    } else if (btn == 'secondary') {
      this.secondaryClicked.emit();
    }
  }

}
