import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentUser } from '../../store/slices/usersSlice/usersSlice.selector';
import { AppStore } from '../../store/store';
import labels from './data/home.json';
import { addUserToStore } from '../../store/slices/usersSlice/usersSlice.actions';
import { UserType } from '../../../../../shared/schemas/userSchema';
import { UsersService } from '../prayers/services/users.service';

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
  // assign user variable
  user: UserType | null = null
  // ui
  quickActions: BtnsData[]
  actions: BtnsData[]
  dateVal: Date = new Date()
  allActionsHeader = labels.allActions
  quickActionsHeader = labels.quickAction
  header = labels.header;
  welcome = labels.welcome;


  constructor(private store: Store<AppStore>,
    private userService: UsersService
  ) {
    this.quickActions = [
      {txt: labels.addOrder, icon: 'add_circle', link: ''},
      {txt: labels.bigTable, icon: 'table_view', link: ''},
      {txt: labels.customForms, icon: 'photo', link: ''},

    ]
  
    this.actions = [
      {txt: labels.prayers, icon: 'group', link: '/prayers-panel'},
      {txt: labels.synagogue, icon: 'synagogue', link: '/synagogue-panel'},
      {txt: labels.doners, icon: 'volunteer_activism', link: '/doners'},      
    ];
  }

  getAllUsers(): void {
    this.userService.getUsers().subscribe(users => {
      users.forEach(user => {
        this.store.dispatch(addUserToStore({ user }));
      });
    });
  }

  ngOnInit(): void {
    // Fetch all users when component initializes
    this.getAllUsers();
    this.currentUser$.subscribe(data => {
      this.user = data
    });


  }
}