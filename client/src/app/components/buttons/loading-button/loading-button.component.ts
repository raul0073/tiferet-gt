import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import labels from './../../../../Data/Labels/login.json';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss'],
})
export class LoadingButtonComponent implements OnInit {
  @Input() alternativeText?: string | undefined = undefined
  @Input() loading: boolean = false;
  @Input() disabled: boolean = true;
  @Output() clickAction = new EventEmitter<void>();
  btnText: string = ''

  constructor(){
    
  }

  ngOnInit(): void {
    this.alternativeText ? this.btnText = this.alternativeText : this.btnText = labels.btnSubmit
  }
  handleClick() {
    if (!this.loading) {
      this.clickAction.emit();
    }
  }
}
