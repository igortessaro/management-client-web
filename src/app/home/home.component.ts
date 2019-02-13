import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomerService } from "../service/customer.service";
import { AuthenticationService } from "../service/auth.service";
import { ComboBoxService } from "../service/combobox.service";
import { CurrentUser } from '../model/currentUser.model';
import { Customer } from "../model/customer.model";
import { ListItem } from "../model/listItem.model";
import { CustomerFilter } from "../model/customerFilter.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  filterCustumerListForm: FormGroup;
  currentUser: CurrentUser;
  customerList: Customer[];
  viewAdm: boolean;
  profile: string;
  cityList: ListItem[];
  classificationList: ListItem[];
  genderList: ListItem[];
  regionList: ListItem[];
  userList: ListItem[];
  customerFilter: CustomerFilter;

  //filterCustumerListForm

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private customerService: CustomerService,
    private comboBoxService: ComboBoxService) { }

  ngOnInit() {
    this.initializeForm();

    let jsonCurrentUser = localStorage.getItem('currentUser');

    console.log('jsonCurrentUser: ', JSON.parse(jsonCurrentUser));

    this.currentUser = JSON.parse(jsonCurrentUser) as CurrentUser;

    console.log('currentUser: ', this.currentUser);

    this.viewAdm = this.currentUser.userType == 0;

    if (this.viewAdm) {
      this.profile = "ADMINISTRATOR";
    } else {
      this.profile = "SELLER";
    }

    this.loadCombobox(this.viewAdm);

    this.initilizeCustomerFilter();

    this.customerService.getAll(this.customerFilter)
      .subscribe(data => {
        console.log('response customerService.getAll: ', data);
        if (data.success) {
          this.customerList = data.payload;
        }
      });
  }

  initializeForm(){
    this.filterCustumerListForm = this.formBuilder.group({
      name: [''],
      gender: [''],
      city: [''],
      seller: [''],
      classification: [''],
      lastPurchaseFinish: [''],
      lastPurchaseInit: [''],
      region: ['']
    });
  }

  formReset(){
    this.initializeForm();
  }

  initilizeCustomerFilter() {
    this.customerFilter = new CustomerFilter();
    this.customerFilter.userId = this.currentUser.id;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

  logged() {
    return this.authService.logged();
  }

  onSubmit() {
    if (this.filterCustumerListForm.invalid) {
      return;
    }

    this.customerFilter.name = this.filterCustumerListForm.controls.name.value;
    this.customerFilter.gender = this.filterCustumerListForm.controls.gender.value;
    this.customerFilter.city = this.filterCustumerListForm.controls.city.value;
    this.customerFilter.seller = this.filterCustumerListForm.controls.seller.value;
    this.customerFilter.classification = this.filterCustumerListForm.controls.classification.value;
    // this.customerFilter.userId = this.filterCustumerListForm.controls.lastPurchaseFinish.value;
    // this.customerFilter.userId = this.filterCustumerListForm.controls.lastPurchaseInit.value;
    this.customerFilter.region = this.filterCustumerListForm.controls.region.value;

    this.customerService.getAll(this.customerFilter)
      .subscribe(data => {
        console.log('response customerService.getAll: ', data);
        if (data.success) {
          this.customerList = data.payload;
        }
      });
  }

  loadCombobox(viewAdm: boolean) {
    this.comboBoxService.cityGetAll()
      .subscribe(data => {
        console.log('response cityGetAll: ', data);
        if (data.success) {
          this.cityList = data.payload;
        }
      });

    this.comboBoxService.classificationGetAll()
      .subscribe(data => {
        console.log('response classificationGetAll: ', data);
        if (data.success) {
          this.classificationList = data.payload;
        }
      });

    this.comboBoxService.genderGetAll()
      .subscribe(data => {
        console.log('response genderGetAll: ', data);
        if (data.success) {
          this.genderList = data.payload;
        }
      });

    this.comboBoxService.regionGetAll()
      .subscribe(data => {
        console.log('response regionGetAll: ', data);
        if (data.success) {
          this.regionList = data.payload;
        }
      });

    if (viewAdm) {
      this.comboBoxService.userGetAll()
        .subscribe(data => {
          console.log('response userGetAll: ', data);
          if (data.success) {
            this.userList = data.payload;
          }
        });
    }
  }
}
