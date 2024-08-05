import { Component, OnInit } from '@angular/core';
import { SynagogueService } from '../../../services/synagogue.service';
import { TransactionType } from '../../../../../../shared/schemas/synagogueSchema';
import { ActivatedRoute } from '@angular/router';
import labels from './../../../../Data/Labels/transaction.json'
@Component({
  selector: 'app-synagogue-tansaction',
  templateUrl: './synagogue-tansaction.component.html',
  styleUrl: './synagogue-tansaction.component.scss'
})
export class SynagogueTansactionComponent implements OnInit {
  transaction: TransactionType = {} as TransactionType;
  transactionID: string = '';
  header: string = labels.header
  constructor(
    private synService: SynagogueService,
    private route: ActivatedRoute
  ) {}

  async loadTransaction() {
    try {
      if (this.transactionID) { 
        this.transaction = await this.synService.getTransactionById(this.transactionID);
      } else {
        console.warn('Transaction ID is not set.');
      }
    } catch (error) {
      console.error('Error fetching transaction:', error);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.transactionID = params['id'];
      this.loadTransaction(); 
    });
  }
}
