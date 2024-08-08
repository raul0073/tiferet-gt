import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllUsers, selectCurrentUser } from '../../store/slices/usersSlice/usersSlice.selector';
import { AppStore } from '../../store/store';
import labels from './data/home.json';
import { addUserToStore } from '../../store/slices/usersSlice/usersSlice.actions';
import { UserType } from '../../../../../shared/schemas/userSchema';
import { UsersService } from '../prayers/services/users.service';
import { OrdersService } from '../prayers/services/orders.service';
import { OrderType } from '../../../../../shared/schemas/orderSchema';
import { BalanceService } from '../synagogue/services/balance.service';
import { BalanceType } from '../../../../../shared/schemas/balanceSchema';
import { updateBalance } from '../../store/slices/balanceSlice/balance.actions';
import { selectBalance } from '../../store/slices/balanceSlice/balance.selector';

export type BtnsData = {
  txt: string, icon: string, link: string
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  // get user from store
  currentUser$: Observable<UserType | null> = this.store.select(selectCurrentUser);
  users$: Observable<UserType[]> = this.store.select(selectAllUsers);
  balanceDisplay: number = 0
  balanceDiff: number = 0
  negativeBalanceCount: number = 0
  totalDebt: number = 0
  // assign user variable
  user: UserType | null = null
  //latest orders
  latestOrders: OrderType[] = []
  // ui
  quickActions: BtnsData[]
  actions: BtnsData[]
  dateVal: Date = new Date()
  allActionsHeader = labels.allActions
  quickActionsHeader = labels.quickAction
  header = labels.header;
  welcome = labels.welcome;


  constructor(private store: Store<AppStore>,
    private userService: UsersService,
    private ordersService: OrdersService,
    private balanceService: BalanceService
  ) {
    this.quickActions = [
      { txt: labels.addOrder, icon: 'add_circle', link: '/prayers/order/add' },
      { txt: labels.bigTable, icon: 'table_view', link: '/prayers/overall-table' },
      { txt: labels.customForms, icon: 'photo', link: '/prayers/custom-prints' },

    ]

    this.actions = [
      { txt: labels.prayers, icon: 'group', link: '/prayers-panel' },
      { txt: labels.synagogue, icon: 'synagogue', link: '/synagogue-panel' },
      { txt: labels.doners, icon: 'volunteer_activism', link: '/doners' },
    ];
  }

   getAllUsers(): void {
    // Select users from the store
    this.store.pipe(select(selectAllUsers)).subscribe(users => {
      if (users.length > 0) {
        this.updateUserStats(users);
      } else {
        // Fetch users from the service and dispatch to store
        this.userService.getUsers().subscribe(fetchedUsers => {
          fetchedUsers.forEach(user => {
            this.store.dispatch(addUserToStore({ user }));
          });
          this.updateUserStats(fetchedUsers);
        });
      }
    });
  }

  private updateUserStats(users: UserType[]): void {
    this.negativeBalanceCount = users.filter((user: UserType) => user.balance < 0).length;
    this.totalDebt = users
      .filter((user: UserType) => user.balance < 0)
      .reduce((total, user) => total + user.balance, 0);
  }


  async getSynagogueBalance(): Promise<void> {
    // Select balance from store
    this.store.pipe(select(selectBalance)).subscribe(balance => {
      if (balance.balance) {
        this.balanceDisplay = balance.balance;
        const previousBalance = balance.balance -balance.transactionAmount;
        this.balanceDiff = ((this.balanceDisplay - previousBalance) / previousBalance) * 100;
      } else {
        
        this.fetchAndStoreBalance();
      }
    });
  }

  private async fetchAndStoreBalance(): Promise<void> {
    try {
      
      const res = await this.balanceService.getBalance();
      this.store.dispatch(updateBalance({ balance: res[0] }));
      this.balanceDisplay = res[0].balance;
      this.balanceDiff = ((res[0].balance - res[1].balance) / res[1].balance) * 100;
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }



  ngOnInit(): void {
    // get all data on init
    this.getAllUsers();
    this.currentUser$.subscribe(data => {
      this.user = data
    });
    this.getSynagogueBalance()
  }
}