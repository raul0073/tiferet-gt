import { Component, HostBinding } from '@angular/core';
import { DonersService } from './sevices/doners.service';
import { IDoner } from '../../../../../shared/schemas/donersSchema';
import labels from './../doners/data/doners.json'
@Component({
  selector: 'app-doners',
  templateUrl: './doners.component.html',
  styleUrl: './doners.component.scss'
})
export class DonersComponent {
  doners: IDoner[] = [];
  displayedColumns: string[] = ["fullName", "amountDonated", "contact", "createdAt"];
  ser:any
  @HostBinding() aaa: any
  header: string = labels.header
  constructor(private donersService: DonersService) {
    this.loadDoners()
    this.ser = donersService as DonersService
  }

  async loadDoners() {
    try {
      this.doners = await this.donersService.getDoners();
    } catch (error) {
      console.error('Error fetching doners:', error);
    }
  }


}