import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from './../../../../shared/schemas/loginSchema';
import { environment } from './../../environments/environments';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    "Access-Control-Allow-Origin": environment.API_URL
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
