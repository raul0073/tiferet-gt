import { Component } from '@angular/core';
import labels from './../../../../Data/Labels/prayers-panel.json';
import { BtnsData } from '../../home/home.component';

@Component({
  selector: 'app-prayers-panel',
  templateUrl: './prayers-panel.component.html',
  styleUrl: './prayers-panel.component.scss'
})
export class PrayersPanelComponent {
  actions: BtnsData[] = []
  header: string = labels.header
 constructor(){
  this.actions = [
    {txt: labels.addOrder, icon: 'add_circle', link: ''},
    {txt: labels.bigTable, icon: 'table_view', link: ''},
    {txt: labels.balaceTable, icon: 'account_balance', link: ''},
    {txt: labels.addUser, icon: 'person_add', link: ''},
    {txt: labels.forms, icon: 'photo', link: ''},
  ]
 }
}
