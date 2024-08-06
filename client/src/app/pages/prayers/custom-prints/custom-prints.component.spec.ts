import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPrintsComponent } from './custom-prints.component';

describe('CustomPrintsComponent', () => {
  let component: CustomPrintsComponent;
  let fixture: ComponentFixture<CustomPrintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomPrintsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomPrintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
