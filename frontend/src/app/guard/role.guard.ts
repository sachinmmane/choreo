import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userGroup = authService.getUserGroup();
  if (userGroup !== 'Department Employee') {
    return true;
  } else {
    router.navigate(['/parcels']);
    return false;
  }
};
