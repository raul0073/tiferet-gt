import { Component, OnInit } from '@angular/core';
import { TransactionType } from '../../../../../../shared/schemas/synagogueSchema';
import { ActivatedRoute } from '@angular/router';
import labels from './../data/transaction.json'
import { SynagogueService } from '../services/synagogue.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-synagogue-tansaction',
  templateUrl: './synagogue-tansaction.component.html',
  styleUrl: './synagogue-tansaction.component.scss'
})
export class SynagogueTansactionComponent implements OnInit {
  transaction: TransactionType = {} as TransactionType;
  transactionID: string = '';
  header: string = labels.header
  dateLabel: string = labels.date
  actionTypeLabel: string = labels.actionType
  amountLabel: string = labels.amount
  paymentTypeLabel: string = labels.paymentType
  paidToLabel: string = labels.padiTo
  chekNolabel: string = labels.chekNo
  constructor(
    private synService: SynagogueService,
    private route: ActivatedRoute,
    private loc: Location,
    private snackBar: SnackBarService
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

  async onDelete() {
    try {
      if (this.transactionID) { 
        this.transaction._id = await this.synService.delTransaction(this.transactionID);
        this.snackBar.openSnackBar("נמחק בהצלחה", 'x')
        this.loc.back()
      } else {
        console.warn('Transaction ID is required.');
      }
    } catch (error) {
      console.error('Error fetching transaction:', error);
      this.snackBar.openSnackBarError("לא ניתן למחוק ", 'x')
    }
  }
}
