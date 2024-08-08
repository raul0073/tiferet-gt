import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserType } from '../../../../../../shared/schemas/userSchema';
import { selectAllUsers } from '../../../store/slices/usersSlice/usersSlice.selector';
import { AppStore } from './../../../store/store';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss'
})
export class AllUsersComponent {
  constructor( private store: Store<AppStore>,){}

  users$: Observable<UserType[]> = this.store.pipe(select(selectAllUsers));
    
}
