import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class Login {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public errorMessage: string | null = null;
  public isRegisterMode = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { notMatching: true };
  }

  onSubmit() {
    if (!this.isRegisterMode && this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.errorMessage = null;
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro desconhecido.';
          this.cdRef.detectChanges();
        }
      });
    } else if (this.isRegisterMode && this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      this.authService.register(name, email, password).subscribe({
        next: () => {
          this.errorMessage = null;
          this.isRegisterMode = false;
          this.registerForm.reset();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao cadastrar. Tente novamente.';
          this.cdRef.detectChanges();
        }
      });
    }
  }

  toggleMode() {
    this.errorMessage = null;
    this.isRegisterMode = !this.isRegisterMode;
  }
}
