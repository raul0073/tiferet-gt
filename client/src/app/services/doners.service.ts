import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IDoner} from './../../../../shared/schemas/donersSchema'
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DonersService {
  constructor(private http: HttpClient) { }

async getDoners(): Promise<IDoner[]>{
  return lastValueFrom(this.http.get<IDoner[]>(`http://localhost:5000/api/doners`))
}
}
