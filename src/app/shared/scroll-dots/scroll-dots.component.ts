import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-dots',
  templateUrl: './scroll-dots.component.html',
  styleUrls: ['./scroll-dots.component.scss']
})
export class ScrollDotsComponent implements OnInit {

  @Input() value: number;
  @Input() number: number;
  dots: boolean[] = [];
  index: number;

  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i <= this.number; i++) {
      this.dots.push(this.value >= i);
    }

    this.index = this.value - 1;
  }

}
