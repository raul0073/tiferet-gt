import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBalanceTableComponent } from './print-balance-table.component';

describe('PrintBalanceTableComponent', () => {
  let component: PrintBalanceTableComponent;
  let fixture: ComponentFixture<PrintBalanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintBalanceTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintBalanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
