import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestActionsComponent } from './latest-actions.component';

describe('LatestActionsComponent', () => {
  let component: LatestActionsComponent;
  let fixture: ComponentFixture<LatestActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LatestActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatestActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
