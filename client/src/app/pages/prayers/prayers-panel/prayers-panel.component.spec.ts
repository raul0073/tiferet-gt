import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayersPanelComponent } from './prayers-panel.component';

describe('PrayersPanelComponent', () => {
  let component: PrayersPanelComponent;
  let fixture: ComponentFixture<PrayersPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrayersPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrayersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
