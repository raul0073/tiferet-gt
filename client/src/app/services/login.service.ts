import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ILogin, loginSchema} from './../../../../shared/schemas/loginSchema';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environments'

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }


  loginUser(loginObj: ILogin): Observable<ILogin>{
    return this.http.post<ILogin>(`${this.API_URL}/login`, loginObj, httpOptions)
  }

}
