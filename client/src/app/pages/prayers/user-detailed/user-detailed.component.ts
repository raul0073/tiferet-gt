import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserTypeWithOrders } from '../../../../../../shared/schemas/userSchema';
import { selectUserById } from '../../../store/slices/usersSlice/usersSlice.selector';
import { AppStore } from '../../../store/store';
import labels from './user-detailed.json'
import { UsersService } from '../services/users.service';
import { OrdersService } from '../services/orders.service';
import { SnackBarService } from './../../../services/snack-bar.service';
import { updateUserinStore } from '../../../store/slices/usersSlice/usersSlice.actions';
@Component({
  selector: 'app-user-detailed',
  templateUrl: './user-detailed.component.html',
  styleUrl: './user-detailed.component.scss'
})
export class UserDetailedComponent implements OnInit {
  constructor(private store: Store<AppStore>,
    private router: ActivatedRoute,
    private userService: UsersService,
    private ordersService: OrdersService,
    private snackBar: SnackBarService
  ) { }
  userId: string = ''
  dateLabel: string = labels.date
  parahsa: string = labels.parasha
  amount: string = labels.amount
  paid: string = labels.paid
  left: string = labels.left
  desc: string = labels.description
  invoice: string = labels.invoiceNo
  userDetailes$: Observable<UserTypeWithOrders | undefined> = this.store.select(selectUserById(this.userId));
  header: string = labels.header
  actions: string = labels.actions



  ngOnInit(): void {
    this.getParams()
  }

  async onDelete(id: string){
    try {
      const res = await this.ordersService.deleteOrder(id)
      this.snackBar.openSnackBar(`נמחק בהצלחה`, "x")
      // update store
      this.store.dispatch(updateUserinStore({user: res}))
      console.log(res)
    } catch (error) {
      console.error(error)
      this.snackBar.openSnackBarError(`לא ניתן למחוק`, "x")
    }
  }
  getParams() {
    this.router.params.subscribe(params => {
      this.userId = params["id"]
      this.userDetailes$ = this.store.select(selectUserById(this.userId));
    })
  }
}
