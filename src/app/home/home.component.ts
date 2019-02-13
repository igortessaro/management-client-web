import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CustomerService } from "../service/customer.service";
import { AuthenticationService } from "../service/auth.service";
import { CurrentUser } from '../model/currentUser.model';
import { Customer } from "../model/customer.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: CurrentUser;
  customerList: Customer[];
  viewAdm: boolean;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private customerService: CustomerService) { }

  ngOnInit() {
    let jsonCurrentUser = localStorage.getItem('currentUser');

    console.log('jsonCurrentUser: ', JSON.parse(jsonCurrentUser));

    this.currentUser = JSON.parse(jsonCurrentUser) as CurrentUser;

    console.log('currentUser: ', this.currentUser);

    this.viewAdm = this.currentUser.userType == 0;

    this.customerService.getAll()
      .subscribe(data => {
        console.log('response: ', data);
        if (data.success) {
          this.customerList = data.payload;
          console.log('response: ', this.customerList);
        }
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

  logged() {
    return this.authService.logged();
  }
}
