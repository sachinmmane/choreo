import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

interface TokenResponse {
  refresh: string;
  access: string;
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('Unauthorized request - perhaps the token has expired');
        // Attempt to refresh the token
        let localUserData: TokenResponse = { refresh: '', access: '' };

        const localData = localStorage.getItem('token');
        if (localData != null) {
          localUserData = JSON.parse(localData) as TokenResponse;
        }

        if (localUserData.refresh) {
          console.log(localUserData.refresh);

          // Make a request to refresh the token
          const refreshReq = new HttpRequest(
            'POST',
            'http://127.0.0.1:8000/api/token/refresh',
            {
              refresh: localUserData.refresh,
            }
          );

          return next(refreshReq).pipe(
            switchMap((event: any) => {
              if (
                event.type === HttpEventType.Response &&
                event instanceof HttpResponse
              ) {
                console.log(event.body);
                if (event.body && event.body.access) {
                  localUserData.access = event.body.access;
                  localStorage.setItem('token', JSON.stringify(localUserData));

                  const cloneRequest = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${localUserData.access || ''}`,
                    },
                  });
                  return next(cloneRequest);
                }
                return throwError('Unable to refresh token');
              }
              return of(event);
            }),
            catchError((err) => {
              console.error('Token refresh failed', err);
              return throwError(err);
            })
          );
        } else {
          console.error('No refresh token available');
          return throwError('Unauthorized');
        }
      } else if (error.status === 403) {
        console.error(
          'Access denied - you do not have permission to access this resource'
        );
      } else if (error.status === 500) {
        console.error('An internal server error occurred');
      } else {
        console.error(`HTTP error: ${error.message}`);
      }
      return throwError(error);
    })
  );
};
