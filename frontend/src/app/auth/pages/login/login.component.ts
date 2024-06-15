import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = signal(true);
  router = inject(Router);

  constructor(private fb: FormBuilder, private userSrv: UserService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggelPasswordInputType(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit(): void {
    this.userSrv.onLogin(this.loginForm.value).subscribe((res: any) => {
      if (res) {
        localStorage.setItem('token', JSON.stringify(res));
        this.router.navigateByUrl('/parcels');
      }
    });
  }
}
