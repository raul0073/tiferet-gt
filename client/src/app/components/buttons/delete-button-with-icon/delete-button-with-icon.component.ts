import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-button-with-icon',
  templateUrl: './delete-button-with-icon.component.html',
  styleUrl: './delete-button-with-icon.component.scss'
})
export class DeleteButtonWithIconComponent {
  @Input() text: string = 'מחק'
  @Input() action?: any
  onClick(){
    if(this.action){
      this.action()
    }
  }
}
