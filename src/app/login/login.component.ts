// src/app/login.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onLogin() {
        if (this.loginForm.invalid) {
            this.errorMessage = 'Por favor, completa todos los campos';
            return;
        }

        const loginData = this.loginForm.value;
        this.http.post('http://localhost:3000/api/auth/login', loginData).subscribe(
            (response: any) => {
                localStorage.setItem('token', response.token);
                this.router.navigateByUrl('/dashboard');
            },
            (error) => {
                this.errorMessage = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
                console.error('Login failed', error);
            }
        );
    }
}
