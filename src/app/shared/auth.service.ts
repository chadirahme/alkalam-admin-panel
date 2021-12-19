import { Injectable } from '@angular/core';
import { User } from './user';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint1: string = 'http://localhost:8080';
  endpoint2: string = 'http://publisherapi-env.eba-hrxgsqfr.us-east-2.elasticbeanstalk.com';
  endpoint: string = environment.APIEndpoint;

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  private userSubject: BehaviorSubject<any>;
  public user: Observable<User>;
  public isLoggedIn$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient,public router: Router) {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('username')!));
    this.user = this.userSubject.asObservable();

    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
  }

  public get userValue(): User {
    return this.userSubject.value;
    }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn1(user: User) {
    return this.http.post<any>(`${this.endpoint}/authenticate`, user)
      .subscribe((res: any) => {
        console.log(res);
       // localStorage.setItem('access_token', res.token);
        this.router.navigate(['dashboard']);
        // this.getUserProfile(res._id).subscribe((res) => {
        //   this.currentUser = res;
        //   this.router.navigate(['user-profile/' + res.msg._id]);
        // })
      })
  }

  signIn(user: User){
    return this.http.post<any>(`${this.endpoint}/authenticate`, user)
    .pipe(
     map(
       userData => {
        //localStorage.setItem('username',user.name as string);
        localStorage.setItem('username',JSON.stringify(user));
        let tokenStr= 'Bearer '+userData.token;
        console.log(tokenStr);
        localStorage.setItem('access_token', tokenStr);
        localStorage.setItem('loggedIn', 'true');
        this.userSubject.next(user);
        this.isLoggedIn$.next(true);
        return userData;
       }
     )

    );
  }

  signIn2(user: User) : Observable<any> {
    return this.http.post<any>(`${this.endpoint}/authenticate`, user)
      .pipe(
        catchError((err) => {
          console.log('error caught in service')
          console.error(err);
 
          //Handle the error here
 
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  getAllStudents1() : Observable<any> {
    return this.http.get<any>(`${this.endpoint}/management/api/v1/users`)
      .pipe(
        catchError((err) => {
          console.log('error caught in service')
          console.error(err);
 
          //Handle the error here
 
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  getAllInvoicesCount(compId:number) : Observable<any> {
    return this.http.get<any>(`${this.endpoint}/dashboard/api/v1/count/${compId}`);
  }

  getAllInvoices() : Observable<any> {
    return this.http.get<any>(`${this.endpoint}/dashboard/api/v1/getInvoices`);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    localStorage.setItem('loggedIn', 'false');
    this.isLoggedIn$.next(false);
    let removeToken = localStorage.removeItem('access_token');
    this.userSubject.next(null);
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // User profile
  // getUserProfile(id:any): Observable<any> {
  //   let api = `${this.endpoint}/user-profile/${id}`;
  //   return this.http.get(api, { headers: this.headers }).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.handleError)
  //   )
  // }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}