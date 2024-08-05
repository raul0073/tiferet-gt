import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDonerComponent } from './add-doner.component';

describe('AddDonerComponent', () => {
  let component: AddDonerComponent;
  let fixture: ComponentFixture<AddDonerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDonerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDonerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
