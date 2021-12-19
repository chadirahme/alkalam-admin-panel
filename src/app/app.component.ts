import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { User } from './shared/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alkalam admin panel';

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  opened: boolean | undefined;
  user: User | undefined;
  accountInfo$: Observable<User> | undefined;
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private authService: AuthService) { 

  }

  ngOnInit() {
    this.user=new User();
    this.user.username="AWS..";
    this.accountInfo$= this.authService.user;
    this.isLoggedIn$=this.authService.isLoggedIn$;
    
    //this.authService.user.subscribe(x => this.user = x);
    //console.log(this.user?.username);
  }

  logout() {
    this.authService.doLogout();
}

  clickHandler() {
    this.sidenav?.close();
  }
}
