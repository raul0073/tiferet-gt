import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserType, UserTypeWithOrders } from '../../../../../../shared/schemas/userSchema';
import { selectUserById } from '../../../store/slices/usersSlice/usersSlice.selector';
import { AppStore } from '../../../store/store';
import labels from './user-detailed.json'
import { UsersService } from '../services/users.service';
import { OrdersService } from '../services/orders.service';
import { SnackBarService } from './../../../services/snack-bar.service';
import { updateOrderInvoice, updateUserinStore } from '../../../store/slices/usersSlice/usersSlice.actions';
import { selectCurrentUser } from './../../../store/slices/usersSlice/usersSlice.selector';
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
  ) {
    
   }
   currentUser$: Observable<UserType | null> = this.store.select(selectCurrentUser)
  userHasAccess: boolean  = false;
   loading: boolean = false;
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
  showEditButton: string | null = null;
   updatedInvoices: { [key: string]: string } = {};

   
   // handle input change
  onInputChange(event: Event, orderId: string) {
    const inputElement = event.target as HTMLInputElement;
    this.updatedInvoices[orderId] = inputElement.value;
    this.showEditButton = orderId;
  }
  // save order invoice
  saveInvoice(orderId: string) {
    const newInvoice = this.updatedInvoices[orderId];
    this.onUpdate(orderId, newInvoice);
    this.showEditButton = null;
  }

  // on update
  async onUpdate(orderId: string, newInvoice: string) {
    try {
      this.store.dispatch(updateOrderInvoice({ orderId, orderInvoice: newInvoice }));
      const res = await this.ordersService.updateOrderInvoice(orderId, newInvoice)
      this.snackBar.openSnackBar(`נשמר בהצלחה`, "x")
    } catch (error) {
      this.snackBar.openSnackBarError(`לא ניתן לשמור מס קבלה`, "x")
      console.error(error)
    }
  }

  ngOnInit(): void {
    this.getParams()
    this.currentUser$.subscribe(user => {
      this.userHasAccess =  user?.hasAccess ?? false;
    });
  }
  getDeleteAction(orderId: string): () => Promise<void> {
    return () => this.onDelete(orderId);
  }
  async onDelete(id: string): Promise<void>{
    this.loading = true
    try {
      const res = await this.ordersService.deleteOrder(id)
      this.snackBar.openSnackBar(`נמחק בהצלחה`, "x")
      // update store
      this.store.dispatch(updateUserinStore({user: res}))
    } catch (error) {
      console.error(error)
      this.snackBar.openSnackBarError(`לא ניתן למחוק`, "x")
    } finally{
      this.loading = false;
    }
  }
  getParams() {
    this.router.params.subscribe(params => {
      this.userId = params["id"]
      this.userDetailes$ = this.store.select(selectUserById(this.userId));
    })
  }
}
