import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log(localStorage.getItem('access_token'));

    if (localStorage.getItem('username') && localStorage.getItem('access_token')) {
      req = req.clone({
        headers: req.headers.set('Authorization', localStorage.getItem('access_token')!)
      });
    }
    return next.handle(req);
    //throw new Error('Method not implemented.');
  }
}
