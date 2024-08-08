import { Component, OnInit } from '@angular/core';
import { OrderType } from '../../../../../../shared/schemas/orderSchema';
import { OrdersService } from '../../prayers/services/orders.service';

@Component({
  selector: 'app-latest-actions',
  templateUrl: './latest-actions.component.html',
  styleUrl: './latest-actions.component.scss'
})
export class LatestActionsComponent implements OnInit{
  constructor(private orderService: OrdersService){}
  latestActions: OrderType[] =[]

  async getLatestOrders(){
    try {
      const res = await this.orderService.getAllOrders()

      this.latestActions = res.slice(0,2)
    } catch (error) {
      console.log(error)
    }
  }
  // join order names
  getNames(names: string[]): string {
    return names.join(', ');
  }
  ngOnInit(): void {
      this.getLatestOrders()
  }
}
