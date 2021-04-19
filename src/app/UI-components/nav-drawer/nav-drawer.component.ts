import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss']
})
export class NavDrawerComponent implements OnInit, OnDestroy {
  @Input() user$: Observable<User>;
  @Output() clicked = new EventEmitter();
  userInitials: string;
  userInitialSub: Subscription;

  get loggedIn(): boolean { return this.authService.loggedIn }

  constructor(private router: Router, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.userInitialSub = this.user$.subscribe(user => {
      const fn = user.firstName;
      const ln = user.lastName;

      this.userInitials = `${fn.charAt(0)}${ln.charAt(0)}`;
    });
  }

  ngOnDestroy(): void {
    this.userInitialSub?.unsubscribe();
  }

  emitClick() {
    this.clicked.emit();
  }

  logout() {
    this.router.navigate(['/login']);
    this.authService.logout();
  }

}
