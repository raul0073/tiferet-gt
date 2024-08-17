import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserTypeWithOrders } from '../../../../../../shared/schemas/userSchema';
import { addUserToStore } from '../../../store/slices/usersSlice/usersSlice.actions';
import { selectAllUsers } from '../../../store/slices/usersSlice/usersSlice.selector';
import { AppStore } from '../../../store/store';
import { UsersService } from '../services/users.service';
import labels from './data/overall-table.json';
@Component({
  selector: 'app-overall-table',
  templateUrl: './overall-table.component.html',
  styleUrl: './overall-table.component.scss'
})
export class OverallTableComponent implements OnInit {
  usersList$: Observable<UserTypeWithOrders[]> = this.store.pipe(select(selectAllUsers));
  header: string = labels.header
  fullName: string = labels.fullName
  nedarim: string = labels.nedarim
  commits: string = labels.commit
  total: string = labels.total

  constructor(
    private userService: UsersService,
    private store: Store<AppStore>
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    try {
      this.store.pipe(select(selectAllUsers)).subscribe(users => {
        if (users.length === 0) {
          // get users
          this.userService.getUsers().subscribe(fetchedUsers => {
            fetchedUsers.forEach(user => {
              this.store.dispatch(addUserToStore({ user }));
            });
          });
        }
      });
    } catch (error) {
      console.error(error)
    }
  }
}