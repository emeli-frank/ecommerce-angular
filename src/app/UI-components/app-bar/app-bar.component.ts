import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  @Input() loggedIn: boolean = false;
  @Input() numberOfCartItems: number = 0;
  @Output() navToggled = new EventEmitter();
  @Output() home = new EventEmitter();
  @Output() searchClicked = new EventEmitter();
  @Output() cart = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleNav() { this.navToggled.emit(); }

  goToHome() { this.home.emit(); }

  search() { this.searchClicked.emit(); }

  goToCart() { this.cart.emit(); }

}
