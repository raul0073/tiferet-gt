import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonersComponent } from './doners.component';

describe('DonersComponent', () => {
  let component: DonersComponent;
  let fixture: ComponentFixture<DonersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
