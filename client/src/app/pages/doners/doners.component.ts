import { Component } from '@angular/core';
import { DonersService } from '../../services/doners.service';
import { IDoner } from '../../../../../shared/schemas/donersSchema';
import labels from './../../../Data/Labels/doners.json'
@Component({
  selector: 'app-doners',
  templateUrl: './doners.component.html',
  styleUrl: './doners.component.scss'
})
export class DonersComponent {
  doners: IDoner[] = [];
  displayedColumns: string[] = ["fullName", "amountDonated", "contact", "createdAt"];
  header: string = labels.header
  constructor(private donersService: DonersService) {
    this.loadDoners()
  }

  async loadDoners() {
    try {
      this.doners = await this.donersService.getDoners();
    } catch (error) {
      console.error('Error fetching doners:', error);
    }
  }
}