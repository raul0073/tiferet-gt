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
  ptihatHihal: string = "";

  constructor(
    private hebcalService: HebcalService,
  ) {}
  
  getHebrewDate(): void {
    this.hebcalService.getHebrewDate()
      .then(data => {
        this.shabbatData = data;
        console.log('Shabbat data:', this.shabbatData);
  
        // Process ptihatHihal after shabbatData is fetched
        if (this.shabbatData?.orders && this.shabbatData.orders.length > 0) {
          const matchingOrder = this.shabbatData.orders.find(order => 
            order.name.includes("פתיחת היכל")
          );
  
          this.ptihatHihal = matchingOrder ? matchingOrder.userName : "לא נמצא פיתחת היכל";
        } else {
          this.ptihatHihal = "לא נמצא פיתחת היכל";
        }
      })
      .catch(error => {
        console.error('Error fetching Shabbat data:', error);
        this.ptihatHihal = "שגיאה בטעינת הנתונים";
      });
  }

  onPrint(): void {
    window.print();
  }
  ngOnInit(): void {
    this.getHebrewDate();
  }
}
