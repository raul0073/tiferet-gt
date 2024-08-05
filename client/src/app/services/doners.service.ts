import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDoner } from './../../../../shared/schemas/donersSchema'
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { httpOptions } from './login.service';
import { environment } from './../../environments/environments'
@Injectable({
  providedIn: 'root'
})
export class DonersService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  async getDoners(): Promise<IDoner[]> {
    return lastValueFrom(this.http.get<IDoner[]>(`${this.API_URL}/doners`))
  }
  async addDoner(donerObj: IDoner): Promise<IDoner> {
    const response = await firstValueFrom(this.http.post<IDoner>(`${this.API_URL}/doners`, donerObj, httpOptions));
    return response
  }
}
