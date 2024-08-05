import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynagogueBalanceComponent } from './synagogue-balance.component';

describe('SynagogueBalanceComponent', () => {
  let component: SynagogueBalanceComponent;
  let fixture: ComponentFixture<SynagogueBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SynagogueBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SynagogueBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
