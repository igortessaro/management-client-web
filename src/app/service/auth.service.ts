import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    baseUrl: string = 'https://localhost:44311/api/login';

    login(username: string, password: string) {
        return this.http.post<any>(this.baseUrl, { email: username, password: password })
            .pipe(map((response: any) => {
                console.log(response);

                if (response.success) {
                    localStorage.setItem('currentUser', JSON.stringify({ username, password, name: response.payload.name }));
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