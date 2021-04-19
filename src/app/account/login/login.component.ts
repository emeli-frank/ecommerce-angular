import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logginIn: boolean = false;
  failedLoggin: boolean = false;
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(32),
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  get email() { return this.form.get('email') }

  get password() { return this.form.get('password') }

  constructor(private router: Router, private authService: AuthService, private ns: NotificationService) { }

  ngOnInit(): void {
  }

  login() {
    this.logginIn = true;
    this.authService.login(this.email.value, this.password.value).subscribe({
      next: _ => {
        this.router.navigate(['/user']);
        this.logginIn = false;
      },
      error: err => {
        this.logginIn = false;
        if (err.status == 401) {
          this.failedLoggin = true;
          this.password.reset();
          return;
        }

        console.error(err);
        this.ns.alertGenericNetworkError();
      }
    });
  }

}
