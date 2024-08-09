import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserType } from '../../../../../../shared/schemas/userSchema';
import { SnackBarService } from '../../../services/snack-bar.service';
import { updateUserinStore } from '../../../store/slices/usersSlice/usersSlice.actions';
import { selectAllUsers, selectCurrentUserName } from '../../../store/slices/usersSlice/usersSlice.selector';
import { AppStore } from '../../../store/store';
import { OrdersService } from '../services/orders.service';
import labels from './../data/addOrder.json';
import orderNames from './data/orderNames.json';

type OrderNamesType = {
  value: string,
  label: string
}

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss'
})


export class AddOrderComponent {
  loading: boolean = false
  users$: Observable<UserType[]> = this.store.pipe(select(selectAllUsers));
  currentUserName$: Observable<string> = this.store.pipe(select(selectCurrentUserName));
  adminName: string = ''
  names: OrderNamesType[] = orderNames;
  header: string = labels.header;
  addOrder: FormGroup = new FormGroup({
    name: new FormControl([], [
      Validators.required,
      Validators.minLength(1)
    ]),
    userId: new FormControl('', [
      Validators.required
    ]),
    parasha: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(0)
    ]),
    pricePaid: new FormControl(0, [
      Validators.required,
      Validators.min(0)
    ]),
    beenPaid: new FormControl(false, [
      Validators.required
    ]),
    orderInvoice: new FormControl('', [])
  });

  constructor(
    private store: Store<AppStore>,
    private orderService: OrdersService,
    private snackBar: SnackBarService
  ) {
    
  }

  async onSubmit() {
    this.loading = true;

    try {
      const adminName = await this.getCurrentUserName();
      const formData = this.addOrder.value;
      formData.beenPaid = formData.pricePaid >= formData.price;

      const withAdminName = {
        ...formData,
        doneBy: adminName
      };

      const orderRes = await this.orderService.addOrder(withAdminName);
      this.store.dispatch(updateUserinStore({user: orderRes}))
      this.addOrder.reset()
      this.snackBar.openSnackBar("הושלם בהצלחה", 'x');
    } catch (error) {
      console.error(error);
      this.snackBar.openSnackBar("Error occurred", 'x');
    } finally {
      this.loading = false;
    }
  }


  // Helper method to get the current user's name
  private getCurrentUserName(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.currentUserName$.subscribe({
        next: name => resolve(name),
        error: err => reject(err)
      });
    });
  }
}
