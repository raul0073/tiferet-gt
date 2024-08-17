import { Component } from '@angular/core';
import { BtnsData } from '../../home/home.component';
import labels from './../data/prayers-panel.json';

@Component({
  selector: 'app-prayers-panel',
  templateUrl: './prayers-panel.component.html',
  styleUrl: './prayers-panel.component.scss'
})
export class PrayersPanelComponent {
  actions: BtnsData[] = []
  header: string = labels.header
  constructor() {
    this.actions = [
      { txt: labels.addOrder, icon: 'add_circle', link: '/prayers/order/add' },
      { txt: labels.bigTable, icon: 'table_view', link: '/prayers/overall-table' },
      // {txt: labels.balaceTable, icon: 'account_balance', link: '/prayers/balance-table'},
      { txt: labels.addUser, icon: 'person_add', link: '/prayers/add' },
      { txt: labels.forms, icon: 'photo', link: '/prayers/custom-prints' },
      { txt: labels.allUsers, icon: 'group', link: '/prayers/all' },
    ]
  }
}
