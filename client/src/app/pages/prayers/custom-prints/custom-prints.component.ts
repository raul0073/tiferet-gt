import { Component } from '@angular/core';
import { BtnsData } from '../../home/home.component';
import labels from './../data/custom.json';
@Component({
  selector: 'app-custom-prints',
  templateUrl: './custom-prints.component.html',
  styleUrl: './custom-prints.component.scss'
})
export class CustomPrintsComponent {
  actions: BtnsData[] = []
  header: string = labels.header
  constructor(  ){
    this.actions = [
      { txt: labels.smallTable, icon: 'table', link: 'print-balance' },
      { txt: labels.alyot, icon: 'toc', link: 'print-balance' },
    ]
  }
}
