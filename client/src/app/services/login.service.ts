import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ILogin, LoginDTO } from './../../../../shared/schemas/loginSchema';
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



  loginUser(loginObj: ILogin): Promise<LoginDTO> {
    return lastValueFrom(this.http.post<LoginDTO>(`${this.API_URL}/login`, loginObj, httpOptions))
  }
}
