import { Component, OnInit } from '@angular/core';
import { TransactionType } from '../../../../../../shared/schemas/synagogueSchema';
import { SynagogueService } from '../../../services/synagogue.service';
import labels from './../../../../Data/Labels/synagogue.json'
import { BalanceService } from '../../../services/balance.service';
import { BalanceType } from '../../../../../../shared/schemas/balanceSchema';
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
