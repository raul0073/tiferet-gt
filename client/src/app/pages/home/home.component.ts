import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserType } from '../../../../../server/src/models/users';
import { selectCurrentUser } from '../../store/slices/usersSlice/usersSlice.selector';
import { AppStore } from '../../store/store';
import labels from './../../../Data/Labels/home.json';
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


  constructor(private store: Store<AppStore>) {
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

  // get user data
  ngOnInit(): void {
    this.currentUser$.subscribe(data => {
      this.user = data
    });
  }
}