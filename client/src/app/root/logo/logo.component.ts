import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  @Input() print? : boolean = false;
  @Input() className?: string
  
}
