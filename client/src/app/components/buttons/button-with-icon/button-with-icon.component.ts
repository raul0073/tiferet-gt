import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-with-icon',
  templateUrl: './button-with-icon.component.html',
  styleUrl: './button-with-icon.component.scss'
})
export class ButtonWithIconComponent {
  @Input() text: string = ''
  // @Input() icon: 
}
