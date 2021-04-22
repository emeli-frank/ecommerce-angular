import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {'class': 'pt-page-content'},
})
export class LoginComponent implements OnInit {

  logginIn: boolean = false;
  returnUrl: string;
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

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private ns: NotificationService) { }

  ngOnInit(): void {
    // set return url
    this.returnUrl = this.route.snapshot.queryParamMap.get('return-url') || null;
  }

  login() {
    this.logginIn = true;
    this.authService.login(this.email.value, this.password.value).subscribe({
      next: _ => {
        this.router.navigate([this.returnUrl || '/']);
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

  goToSignUp() {
    this.router.navigate(['sign-up'], {
      queryParams: {'return-url': this.returnUrl}
    });
  }

}
