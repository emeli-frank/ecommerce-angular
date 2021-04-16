import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.email.value, this.password.value).subscribe({
      next: _ => {
        console.log('successful');
        this.router.navigate(['/user']);
      },
      error: err => {
        console.error(err);
      }
    });
  }

}
