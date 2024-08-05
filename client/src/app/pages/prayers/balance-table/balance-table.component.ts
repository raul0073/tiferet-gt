import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserType } from '../../../../../../shared/schemas/userSchema';
import { selectAllUsers } from '../../../store/slices/usersSlice/usersSlice.selector';
import { AppStore } from '../../../store/store';
import labels from './../../../../Data/Labels/balance-table.json'
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
              
  ) {}


  ngOnInit(): void {
    this.data = this.store.select(selectAllUsers);
    this.data.subscribe(data => {
      this.tableData = data
    });
  }
}