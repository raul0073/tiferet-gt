import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { ITransaction, TransactionType } from '../../../../../../shared/schemas/synagogueSchema';
import { httpOptions } from '../../../services/login.service';



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
  async addTransaction(transaction: ITransaction): Promise<ITransaction> {
    return lastValueFrom(this.http.post<ITransaction>(`${this.API_URL}/synagogue/transactions`, transaction, httpOptions))
  }
  async delTransaction(id: string): Promise<string> {
    return lastValueFrom(this.http.delete<string>(`${this.API_URL}/synagogue/transactions/${id}`))
  }
}
