import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() value: number = 0;
  @Input() number: number;
  ratings: boolean[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.value > 5) {
      throw 'value cannot be greater than 5';
    }

    for (let i = 1; i <= 5; i++) {
      if (i <= this.value) {
        this.ratings.push(true);
      } else {
        this.ratings.push(false);
      }
    }
  }

}
