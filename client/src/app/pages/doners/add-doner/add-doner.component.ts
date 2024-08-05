import { Component } from '@angular/core';
import labels from './../../../../Data/Labels/doners.json'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonersService } from '../../../services/doners.service';
import { SnackBarService } from '../../../services/snack-bar.service';
@Component({
  selector: 'app-add-doner',
  templateUrl: './add-doner.component.html',
  styleUrl: './add-doner.component.scss'
})
export class AddDonerComponent {
  constructor(private donerService: DonersService,
              private snackbar: SnackBarService){}
  loading: boolean = false
  // ui labels
  header: string = labels.header
  add: string = labels.add
  addDoner: string = labels.addDoner

  addDonerForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    amountDonated: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
      Validators.pattern('^[0-9]*$'),
    ]),
    contact: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
  })
  async saveDoner() { 
    try {
      await this.donerService.addDoner(this.addDonerForm.value);
      this.snackbar.openSnackBar('תורם נוסף בהצלחה', 'x')
    } catch (error) {
      this.snackbar.openSnackBarError('תקלה.לא ניתן להוסיף תורם', 'x')
      console.error('Failed to save doner:', error);
    } finally{
      this.addDonerForm.reset()
    }
  }
}
