import { Component } from '@angular/core';
import labels from './../../../../Data/Labels/transaction.json'
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-synagogue-add-transaction',
  templateUrl: './synagogue-add-transaction.component.html',
  styleUrl: './synagogue-add-transaction.component.scss'
})
export class SynagogueAddTransactionComponent {
  header: string = labels.addHeader
  loading: boolean = false
  addText: string = labels.add
  addTransactionForm: FormGroup = new FormGroup({
    actionType: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(2),
    ]),
    paymentType: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(1),
    ]),
    checkNo: new FormControl('', []), 
    amountPaid: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    paidTo: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(1),
    ]),
    createdAt: new FormControl(new Date(), []),
  })


  async addTransaction() { 
    console.log(this.addTransactionForm.valid)
  }
}
