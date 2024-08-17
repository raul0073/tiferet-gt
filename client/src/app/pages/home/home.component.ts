import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { OrderType } from '../../../../../shared/schemas/orderSchema';
import { UserType } from '../../../../../shared/schemas/userSchema';
import { updateBalance } from '../../store/slices/balanceSlice/balance.actions';
import { selectBalance } from '../../store/slices/balanceSlice/balance.selector';
import { addUserToStore } from '../../store/slices/usersSlice/usersSlice.actions';
import { selectAllUsers, selectCurrentUser } from '../../store/slices/usersSlice/usersSlice.selector';
import { AppStore } from '../../store/store';
import { UsersService } from '../prayers/services/users.service';
import { BalanceService } from '../synagogue/services/balance.service';
import labels from './data/home.json';

export type BtnsData = {
  txt: string;
  icon: string;
  link: string;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser$: Observable<UserType | null> = this.store.select(selectCurrentUser);
  users$: Observable<UserType[]> = this.store.select(selectAllUsers);
  balanceDisplay: number = 0;
  balanceDiff: number = 0;
  negativeBalanceCount: number = 0;
  totalDebt: number = 0;
  user: UserType | null = null;
  latestOrders: OrderType[] = [];
  quickActions: BtnsData[];
  actions: BtnsData[];
  dateVal: Date = new Date();
  allActionsHeader = labels.allActions;
  quickActionsHeader = labels.quickAction;
  header = labels.header;
  welcome = labels.welcome;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<AppStore>,
    private userService: UsersService,
    private balanceService: BalanceService
  ) {
    this.quickActions = [
      { txt: labels.addOrder, icon: 'add_circle', link: '/prayers/order/add' },
      { txt: labels.bigTable, icon: 'table_view', link: '/prayers/overall-table' },
      { txt: labels.customForms, icon: 'photo', link: '/prayers/custom-prints' },
    ];

    this.actions = [
      { txt: labels.prayers, icon: 'group', link: '/prayers-panel' },
      { txt: labels.synagogue, icon: 'synagogue', link: '/synagogue-panel' },
      { txt: labels.doners, icon: 'volunteer_activism', link: '/doners' },
    ];
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {

    combineLatest([
      this.store.pipe(select(selectCurrentUser)),
      this.store.pipe(select(selectAllUsers)),
      this.store.pipe(select(selectBalance))
    ]).pipe(
      takeUntil(this.destroy$),
      tap(([currentUser, users, balance]) => {
        this.user = currentUser;
        if (users.length > 0) {
          this.updateUserStats(users);
        } else {
          this.fetchUsers();
        }

        if (balance.balance) {
          this.updateBalanceStats(balance);
        } else {
          this.fetchAndStoreBalance();
        }
      })
    ).subscribe();
  }

  private fetchUsers(): void {
    this.userService.getUsers().pipe(
      takeUntil(this.destroy$),
      tap(fetchedUsers => {
        fetchedUsers.forEach(user => {
          this.store.dispatch(addUserToStore({ user }));
        });
        this.updateUserStats(fetchedUsers);
      })
    ).subscribe();
  }

  private updateUserStats(users: UserType[]): void {
    this.negativeBalanceCount = users.filter(user => user.balance < 0).length;
    this.totalDebt = users
      .filter(user => user.balance < 0)
      .reduce((total, user) => total + user.balance, 0);
  }

  private updateBalanceStats(balance: any): void {
    this.balanceDisplay = balance.balance;
    const previousBalance = balance.balance - balance.transactionAmount;
    this.balanceDiff = ((this.balanceDisplay - previousBalance) / previousBalance) * 100;
  }

  private async fetchAndStoreBalance(): Promise<void> {
    try {
      const res = await this.balanceService.getBalance();
      this.store.dispatch(updateBalance({ balance: res[0] }));
      this.updateBalanceStats(res[0]);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }

  ngOnDestroy(): void {
    
    this.destroy$.next();
    this.destroy$.complete();
  }
}
