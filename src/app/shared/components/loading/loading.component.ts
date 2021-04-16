import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {

  @Input() message: string;
  interval;
  activeIndicatorNum = 0;
  indicators = [
    {visible: false},
    {visible: false},
    {visible: false},
  ];

  constructor() { }

  ngOnInit(): void {
    this.message = this.message || 'Loading';
    this.interval = setInterval(() => {
      this.indicators[0].visible = false;
      this.indicators[1].visible = false;
      this.indicators[2].visible = false;

      for (let i = 0; i < this.activeIndicatorNum % 4; i++) {
        this.indicators[i].visible = true;
      }
      this.activeIndicatorNum = ++this.activeIndicatorNum % 4;
    }, 500);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
