import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserType } from '../../../../../../shared/schemas/userSchema';
import { addUserToStore } from '../../../store/slices/usersSlice/usersSlice.actions';
import { selectAllUsers } from '../../../store/slices/usersSlice/usersSlice.selector';
import { AppStore } from '../../../store/store';
import { UsersService } from '../services/users.service';
import labels from './../data/balance-table.json';
@Component({
  selector: 'app-balance-table',
  templateUrl: './balance-table.component.html',
  styleUrl: './balance-table.component.scss'
})
export class BalanceTableComponent implements OnInit {
  data: Observable<UserType[]> = this.store.select(selectAllUsers);
  tableData: any
  displayedColumns: string[] = ["firstName", "balance"];
  header: string = labels.header
  constructor(private store: Store<AppStore>,
    private usersService: UsersService
  ) { }


  ngOnInit(): void {
    this.data = this.store.select(selectAllUsers);
    this.usersService.getUsers().subscribe(users => {
      if (users.length) {
        users.forEach(user => {

          this.store.dispatch(addUserToStore({ user }))
        })
      } else {
        this.data.subscribe(data => {
          this.tableData = data
        });
      }
    })
  }
}