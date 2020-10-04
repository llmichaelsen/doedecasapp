import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserType } from 'app/ui/models/user/user-type.enum';
import { AuthRepository } from 'app/ui/repositories/auth.repository';
import { AuthService } from 'app/ui/services/auth.service';
import { error } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authServ: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.authServ.authenticate(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .then(r => {

          this.router.navigate(['/'])

      })
      .catch(error => alert(error.message))
  }



}
