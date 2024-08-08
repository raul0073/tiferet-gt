import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import labels from './../data/add-user.json'
import { UsersService } from '../services/users.service';
import { SnackBarService } from '../../../services/snack-bar.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  constructor(private userService: UsersService,
            private snackBar: SnackBarService
  ){}
  header: string = labels.header
  hasAceessLabel: string = labels.hasAccess
  loading: boolean = false
  addUserForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(1),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(1),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(1),
    ]),
    hasAccess: new FormControl(false, [
      Validators.required
    ])
  })

  async onSubmit() {
    try {
      await this.userService.addUser(this.addUserForm.value)
      this.snackBar.openSnackBar("משתמש נוסף בהצלחה", 'x')
      this.addUserForm.reset()
    } catch (err) {
      console.log(err)
      this.snackBar.openSnackBarError("תקלה. לא ניתן להוסיף משתמש", 'x')
    } finally {
      this.loading = false;
    }
  }

}
