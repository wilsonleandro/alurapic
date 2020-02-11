import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from './new-user';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class SignupService {

    constructor(private http: HttpClient) {}

    checkUserNameTaken(userName: string) {
        return this.http.get(apiUrl + '/user/exists/' + userName);
    }

    signup(newUser: NewUser) {
        return this.http.post(apiUrl + '/user/signup', newUser);
    }

}