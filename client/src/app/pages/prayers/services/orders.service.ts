import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { httpOptions } from '../../../services/login.service';
import { IOrder, OrderType } from './../../../../../../shared/schemas/orderSchema';
@Injectable({
  providedIn: 'root'
})


export class OrdersService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  getAllOrders(): Promise<OrderType[]> {
    return lastValueFrom(this.http.get<OrderType[]>(`${this.API_URL}/orders`))
  }

  addOrder(order: IOrder): Promise<any> {
    return lastValueFrom(this.http.post<IOrder>(`${this.API_URL}/orders`, order, httpOptions))
  }

  deleteOrder(orderId: string): Promise<any> {
    return lastValueFrom(this.http.delete<string>(`${this.API_URL}/orders/${orderId}`, httpOptions))
  }
}
