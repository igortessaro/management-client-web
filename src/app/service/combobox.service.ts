import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from "../globals/globals";
import { Notification } from "../model/notification.model";

@Injectable({ providedIn: 'root' })
export class ComboBoxService {

    constructor(
        private http: HttpClient,
        private server: Globals) { }

    cityGetAll() {
        let baseUrl = this.server.serverBaseUrl + this.server.serverEndPointCity;
        return this.http.get<Notification>(baseUrl);
    }

    classificationGetAll() {
        let baseUrl = this.server.serverBaseUrl + this.server.serverEndPointClassification;
        return this.http.get<Notification>(baseUrl);
    }

    genderGetAll() {
        let baseUrl = this.server.serverBaseUrl + this.server.serverEndPointGender;
        return this.http.get<Notification>(baseUrl);
    }

    regionGetAll() {
        let baseUrl = this.server.serverBaseUrl + this.server.serverEndPointRegion;
        return this.http.get<Notification>(baseUrl);
    }

    userGetAll() {
        let baseUrl = this.server.serverBaseUrl + this.server.serverEndPointUser;
        return this.http.get<Notification>(baseUrl);
    }
}