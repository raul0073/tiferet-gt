import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IUser} from './../../../../shared/schemas/userSchema';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

getUserById(id: string): Observable<IUser>{
  return this.http.get<IUser>(`http://localhost:5000/api/users/${id}`)
}
getUsers(): Observable<IUser[]>{
  return this.http.get<IUser[]>(`http://localhost:5000/api/users`)
}
}

