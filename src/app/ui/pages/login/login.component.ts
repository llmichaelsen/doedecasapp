import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/ui/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    data: Date = new Date();
    focus;
    focus1;

    loginForm: FormGroup;

    constructor(
        private authServ: AuthService,
        private fb: FormBuilder,
        private router: Router
    ) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    onSubmit() {
        this.authServ.authenticate(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
            .then(r => {
                this.router.navigate(['/'])
            })
            .catch(error => alert(error.message))
    }

}
