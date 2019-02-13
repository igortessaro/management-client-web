import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Globals } from "../globals/globals";
import { Notification } from "../model/notification.model";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(
        private http: HttpClient,
        private server: Globals) { }

    private baseUrl: string = this.server.serverBaseUrl + this.server.serverEndPointLogin;

    login(username: string, password: string) {
        return this.http.post<Notification>(this.baseUrl, { email: username, password: password })
            .pipe(map((response: Notification) => {
                console.log(response);

                if (response.success) {
                    localStorage.setItem('currentUser', JSON.stringify({ id: response.payload.id, email: response.payload.email, name: response.payload.name, userType: response.payload.userType }));
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    logged() {
        return localStorage.getItem('currentUser') != null;
    }
}