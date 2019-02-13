import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from "../globals/globals";
import { Notification } from "../model/notification.model";

@Injectable({ providedIn: 'root' })
export class CustomerService {

    constructor(
        private http: HttpClient,
        private server: Globals) { }

    getAll() {
        let baseUrl = this.server.serverBaseUrl + this.server.serverEndPointCustomer;
        return this.http.get<Notification>(baseUrl);
    }
}