import { Component } from '@angular/core';
import { BtnsData } from '../../home/home.component';
import labels from './../../../../Data/Labels/synagogue-panel.json'
@Component({
  selector: 'app-synagogue-panel',
  templateUrl: './synagogue-panel.component.html',
  styleUrl: './synagogue-panel.component.scss'
})
export class SynagoguePanelComponent {
  actions: BtnsData[] = []
  header: string = labels.header
  constructor(){
   this.actions = [
     {txt: labels.balance, icon: 'balance', link: ''},
     {txt: labels.transaction, icon: 'payments', link: ''},
   ]
  }
}
