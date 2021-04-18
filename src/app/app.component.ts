import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<User>;
  loggedIn$: Observable<boolean>;

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
  }

  toggleNav() {
    alert('coming soon')
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

}
