import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, Observable, switchMap, tap, throwError} from "rxjs";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Outgoing HTTP request', request);// this will log the request to the console


    // Check if the request is for the login endpoint
    if (request.url.includes('auth')) {
      return next.handle(request);
    }

    const token = localStorage.getItem('accessToken');// get the token from the local storage

    if (token) {
      return next.handle(this.addToken(request, token)).pipe(
        catchError((error) => {
          if (error.status === 403
            || error.status === 401
          ) {
            // alert('Token expired')
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
              console.error("No refresh token found");
              return throwError(() => new Error("No refresh token found"));
            }
            return this.authService.refreshToken().pipe(
              switchMap((res: any) => {
                console.log('!!! Refresh token response:', res);
                localStorage.setItem('accessToken', res.token);
                localStorage.setItem('refreshToken', res.refreshToken);
                return next.handle(this.addToken(request, res.token));
              }),
              catchError((error) => {
                console.error('!!! Error while refreshing token:', error);
                this.authService.logout();
                return throwError(error);
              })
            );
          }
          // if (error.status === 401){
          //   this.router.navigate(['/unauthorized']);
          // }
          return throwError(error);
        })
      );
    } else {
      // Handle case where token is not available
      console.error('Access token not found');
      return next.handle(request);
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // if (token) {
  //   const newCloneRequest = request.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  //
  //   return next.handle(newCloneRequest).pipe(
  //     tap(
  //       (event: HttpEvent<any>) => {
  //         if (event instanceof HttpResponse) {
  //           console.log('HTTP Response:', event);
  //         }
  //       },
  //       (error) => {
  //         console.error('HTTP Error:', error);
  //         // Handle error by using refresh token
  //         if (error.status === 401) {
  //           this.authService.refreshToken().subscribe(
  //             (res: any) => {
  //               console.log('Refresh token response:', res);
  //               localStorage.setItem('accessToken', res.token);
  //               localStorage.setItem('refreshToken', res.refreshToken);
  //             },
  //             (error) => {
  //               console.error('Error while refreshing token:', error);
  //               this.authService.logout();
  //             }
  //           );
  //         }
  //       }
  //     )
  //   );
  // } else {
  //   // Handle case where token is not available
  //   console.error('Access token not found');
  //   return next.handle(request);
  // }

}
