import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { TransactionType } from './../../../../shared/schemas/synagogueSchema';
import { environment } from './../../environments/environments'

@Injectable({
  providedIn: 'root'
})
export class SynagogueService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  async getTransactions(): Promise<TransactionType[]> {
    return lastValueFrom(this.http.get<TransactionType[]>(`${this.API_URL}/synagogue/transactions`))
  }
  async getTransactionById(id: string): Promise<TransactionType> {
    return lastValueFrom(this.http.get<TransactionType>(`${this.API_URL}/synagogue/transactions/${id}`))
  }
}
