import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from "../globals/globals";
import { Notification } from "../model/notification.model";
import { CustomerFilter } from "../model/customerFilter.model";

@Injectable({ providedIn: 'root' })
export class CustomerService {

    constructor(
        private http: HttpClient,
        private server: Globals) { }

    getAll(filter: CustomerFilter) {
        let baseUrl = this.server.serverBaseUrl + this.server.serverEndPointCustomer;
        return this.http.post<Notification>(baseUrl, filter);
    }
}