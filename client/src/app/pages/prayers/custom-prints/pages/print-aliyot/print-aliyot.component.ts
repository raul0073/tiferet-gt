import { Component, OnInit } from '@angular/core';
import { HebcalService, ShabbatData } from '../print-balance-table/services/getHebrewDateService';
@Component({
  selector: 'app-print-aliyot',
  templateUrl: './print-aliyot.component.html',
  styleUrl: './print-aliyot.component.scss'
})
export class PrintAliyotComponent implements OnInit{
  shabbatData: ShabbatData | null = null;
  hazanIcon = 'assets/jewish.png';
  candelsIcon = 'assets/sabbath.png';
  bookIcon = 'assets/torah.png';
  talitIcon = 'assets/tallit.png';
  davidIcon = 'assets/star-of-david.png';
  shofarIcon = 'assets/shofar.png';
  haftaraIcon = 'assets/haftara.png';

  constructor(
    private hebcalService: HebcalService,
  ) {}
  getHebrewDate(): void {
    this.hebcalService.getHebrewDate()
      .then(data => {
        this.shabbatData = data;
        console.log('Shabbat data:', this.shabbatData);
      })
      
      .catch(error => {
        console.error('Error fetching Shabbat data:', error);
      });
  }

  onPrint(): void {
    window.print();
  }
  ngOnInit(): void {
    this.getHebrewDate();
  }
}
