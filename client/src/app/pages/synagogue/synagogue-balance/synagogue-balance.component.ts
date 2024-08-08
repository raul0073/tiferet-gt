import { Component, OnInit } from '@angular/core';
import { BalanceType } from '../../../../../../shared/schemas/balanceSchema';
import { BalanceService } from '../services/balance.service';
import labels from './../data/synagogue.json';
@Component({
  selector: 'app-synagogue-balance',
  templateUrl: './synagogue-balance.component.html',
  styleUrl: './synagogue-balance.component.scss'
})
export class SynagogueBalanceComponent implements OnInit{
  balance: BalanceType[] = [];
  displayedColumns: string[] = ["createdAt", "type", "transactionAmount", "balance"];

  header: string = labels.header
  constructor(private balanceService: BalanceService){}

  onRowClick(id: string){
    console.log(id)
  }
  async loadBalance() {
    try {
      this.balance = await this.balanceService.getBalance();
    } catch (error) {
      console.error('Error fetching synagogue balance:', error);
    }
  }

  ngOnInit(): void {
      this.loadBalance()
  }
}
