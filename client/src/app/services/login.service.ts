import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ILogin, loginSchema} from './../../../../shared/schemas/loginSchema';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  loginUser(loginObj: ILogin): Observable<ILogin>{
    return this.http.post<ILogin>(`http://localhost:5000/api/login`, loginObj, httpOptions)
  }

}
