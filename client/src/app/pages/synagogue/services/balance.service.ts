import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {BalanceType} from '../../../../../../shared/schemas/balanceSchema'
import { environment } from '../../../../environments/environments'
@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  async getBalance(): Promise<BalanceType[]> {
    return lastValueFrom(this.http.get<BalanceType[]>(`${this.API_URL}/synagogue/balance`))
  }

}
