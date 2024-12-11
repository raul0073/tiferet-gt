import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from './../../../../../../../environments/environments';
export type prayerTime = {
  time: string;
  name: string;
}
export interface ShabbatData {
  shabbatStart: string;
  shabbatEnd: string;
  hebrew: string;
  parasha: string;
  book: string;
  hazan: string[];
  prayerTimes: prayerTime[];
  orders: Array<{
    _id: string;
    userId: string;
    userName: string;
    name: string[];
    createdAt: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class HebcalService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  async getHebrewDate(): Promise<ShabbatData> {
    return lastValueFrom(this.http.get<ShabbatData>(`${this.API_URL}/hebcal`));
  }
}
