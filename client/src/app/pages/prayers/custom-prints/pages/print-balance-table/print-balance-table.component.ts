import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserTypeWithOrders } from '../../../../../../../../shared/schemas/userSchema';
import { addUserToStore } from '../../../../../store/slices/usersSlice/usersSlice.actions';
import { selectAllUsers } from '../../../../../store/slices/usersSlice/usersSlice.selector';
import { AppStore } from '../../../../../store/store';
import { UsersService } from '../../../services/users.service';
import { HebcalService, ShabbatData } from './services/getHebrewDateService';

@Component({
  selector: 'app-print-balance-table',
  templateUrl: './print-balance-table.component.html',
  styleUrls: ['./print-balance-table.component.scss']
})
export class PrintBalanceTableComponent implements OnInit {
  usersList$: Observable<UserTypeWithOrders[]> = this.store.pipe(select(selectAllUsers));  
  usersPart1: UserTypeWithOrders[] = [];
  usersPart2: UserTypeWithOrders[] = [];
  shabbatData: ShabbatData | null = null;
  
  constructor(
    private userService: UsersService,
    private hebcalService: HebcalService,
    private store: Store<AppStore>
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getHebrewDate();
  }

  getHebrewDate(): void {
    this.hebcalService.getHebrewDate()
      .then(data => {
        this.shabbatData = data;
        console.log('Shabbat data:', this.shabbatData);
      })
      .catch(error => {
        console.error('Error fetching Shabbat data:', error);
      });
  }

  onPrint(): void {
    window.print();
  }

  getAllUsers(): void {
    try {
      this.store.pipe(select(selectAllUsers)).subscribe(users => {
        if (users.length === 0) {
          // Fetch users from the service and dispatch to store if not present
          this.userService.getUsers().subscribe(fetchedUsers => {
            fetchedUsers.forEach(user => {
              this.store.dispatch(addUserToStore({ user }));
            });
          });
        }
      });
      this.usersList$.subscribe(users => {
        const mid = Math.ceil(users.length / 2);
        this.usersPart1 = users.slice(0, mid);
        this.usersPart2 = users.slice(mid);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
