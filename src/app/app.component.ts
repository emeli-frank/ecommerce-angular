import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('backdropFadeInAndOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate(250, style({opacity: 1})),
      ]),
      transition(':leave', [
        animate(250, style({opacity: 0})),
      ])
    ]),
    trigger('navSlideInandOut', [
      transition(':enter', [
        style({transform: 'translatex(-100%)'}),
        animate(200, style({transform: 'translatex(0%)'})),
      ]),
      transition(':leave', [
        animate(200, style({transform: 'translatex(-100%)'})),
      ])
    ])
  ],
})
export class AppComponent {
  user$: Observable<User>;
  loggedIn$: Observable<boolean>;
  loadingPage: boolean = false;
  navOpened: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.user$ = this.authService.user$;
    this.loggedIn$ = this.authService.user$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }),
    );

    this.router.events.subscribe((event: Event) => {
      switch(true) {
        case event instanceof NavigationStart: {
          this.loadingPage = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loadingPage = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  toggleNav() {
    this.navOpened = !this.navOpened;
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  openSearch() {
    alert('coming soon');
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  closeNav() {
    this.navOpened = false;
  }

}
