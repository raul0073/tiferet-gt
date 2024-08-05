import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserType, IUser } from '../../../../shared/schemas/userSchema';
import { environment } from './../../environments/environments'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

getUserById(id: string): Observable<IUser>{
  return this.http.get<IUser>(`${this.API_URL}/users/${id}`)
}
getUsers(): Observable<UserType[]>{
  return this.http.get<UserType[]>(`${this.API_URL}/users`)
}
}
