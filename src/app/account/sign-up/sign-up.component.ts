import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { Roles } from 'src/app/shared/enums/roles.enum';
import { Customer } from 'src/app/shared/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  host: {'class': 'py-page-content'},
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  returnUrl: string;

  get firstName() { return this.form.get('firstName') }

  get lastName() { return this.form.get('lastName') }

  get email() { return this.form.get('email') }

  get password() { return this.form.get('password') }

  get confirmPassword() { return this.form.get('confirmPassword') }

  constructor(private router: Router, private route: ActivatedRoute, private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(32),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(32),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(128),
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(32),
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ])
    }, passwordMatchValidator,);

    // set return url
    this.returnUrl = this.route.snapshot.queryParamMap.get('return-url') || null;
    console.log(this.returnUrl);
  }

  submit() {
    const customer = Customer.fromJSON({
      first_name: this.firstName.value,
      last_name: this.lastName.value,
      email: this.email.value,
      roles: [Roles.Customer],
    });

    const password = this.password.value;

    this.registrationService.register(customer, password).subscribe({
      next: _ => {
        this.router.navigate(['/login'], {queryParams: {"return-url": this.returnUrl}});
      },
      error: err => {
        console.error(err);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['login'], {
      queryParams: {'return-url': this.returnUrl}
    });
  }

}

function passwordMatchValidator(control: FormGroup): ValidationErrors | null {
  const password = control.get('password');
  const passwordConfirmation = control.get('confirmPassword');

  if (password.value !== passwordConfirmation.value) {
    passwordConfirmation.setErrors({'passwordMismatch': {value: true}});
    return  {'passwordMismatch': true};
  }

  passwordConfirmation.setErrors(null);
  return null;
}

