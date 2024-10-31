import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { IUser, UserType, UserTypeWithOrders } from '../../../../../../shared/schemas/userSchema';
import { httpOptions } from '../../../services/login.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<UserTypeWithOrders> {
    return this.http.get<UserTypeWithOrders>(`${this.API_URL}/users/${id}`)
  }
  getUsers(): Observable<UserTypeWithOrders[]> {
    return this.http.get<UserTypeWithOrders[]>(`${this.API_URL}/users`)
  }
  async addUser(user: IUser): Promise<UserType> {
    return lastValueFrom(this.http.post<UserType>(`${this.API_URL}/users`, user, httpOptions))
  }
  async deleteUser(id: string): Promise<Observable<string>> {
    return this.http.delete<string>(`${this.API_URL}/users/${id}`, httpOptions)
  }
}
