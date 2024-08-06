import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { IUser, UserType } from '../../../../../../shared/schemas/userSchema';
import { httpOptions } from '../../../services/login.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.API_URL}/users/${id}`)
  }
  getUsers(): Observable<UserType[]> {
    return this.http.get<UserType[]>(`${this.API_URL}/users`)
  }
  async addUser(user: IUser): Promise<UserType>{
    return lastValueFrom(this.http.post<UserType>(`${this.API_URL}/users`, user, httpOptions))
  }
}
