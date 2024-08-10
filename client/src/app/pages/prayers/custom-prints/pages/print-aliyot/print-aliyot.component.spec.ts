import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintAliyotComponent } from './print-aliyot.component';

describe('PrintAliyotComponent', () => {
  let component: PrintAliyotComponent;
  let fixture: ComponentFixture<PrintAliyotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintAliyotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintAliyotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
