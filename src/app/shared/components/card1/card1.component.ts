import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card1',
  templateUrl: './card1.component.html',
  styleUrls: ['./card1.component.scss']
})
export class Card1Component implements OnInit {
  @Input() circleIconName: string;
  @Input() circlePosition: 'top' | 'bottom' = 'top';
  @Input() circleColor: 'primary' | 'light' = 'primary';

  constructor() { }

  ngOnInit(): void {
    if (this.circlePosition != 'top' && this.circlePosition != 'bottom') {
      throw 'circlePosition can either be "top" or "bottom"';
    }

    if (this.circleColor != 'primary' && this.circleColor != 'light') {
      throw 'circleColor can either be "primary", "dark" or "light"';
    }
  }

}
