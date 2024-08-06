import { Component } from '@angular/core';
import labels from './../data/transaction.json'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SynagogueService } from '../services/synagogue.service';
import { SnackBarService } from '../../../services/snack-bar.service';
@Component({
  selector: 'app-synagogue-add-transaction',
  templateUrl: './synagogue-add-transaction.component.html',
  styleUrl: './synagogue-add-transaction.component.scss'
})
export class SynagogueAddTransactionComponent {

  constructor(private synService: SynagogueService,
              private snackBar: SnackBarService
  ){}
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
    expenseType: new FormControl('', []),
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
  })


  async postTransaction() { 
    this.loading = true
    // cast to a number
    let type = Number(this.addTransactionForm.get('actionType')?.value)
    this.addTransactionForm.get('actionType')?.setValue(type);
    // log
    try {
      const res = await this.synService.addTransaction(this.addTransactionForm.value)
      this.snackBar.openSnackBar("הוזן בהצלחה", 'x')
      this.addTransactionForm.reset()
    } catch (error) {
      console.log(error)
      this.snackBar.openSnackBarError("תקלה. לא ניתן להוסיף", 'x')
    }finally{
      this.loading = false
    }
  }
}
