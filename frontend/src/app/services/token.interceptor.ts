import { HttpInterceptorFn } from '@angular/common/http';

interface TokenResponse {
  refresh: string;
  access: string;
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let localUserData: TokenResponse = { access: '', refresh: '' };

  const localData = localStorage.getItem('token');
  if (localData != null) {
    localUserData = JSON.parse(localData) as TokenResponse;
  }

  // Check if the request URL is the login API
  if (req.url.includes('/token')) {
    return next(req); // Do not set any headers for login API
  }

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localUserData.access || ''}`,
    },
  });
  return next(cloneRequest);
};
