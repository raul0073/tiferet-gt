import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynagoguePanelComponent } from './synagogue-panel.component';

describe('SynagoguePanelComponent', () => {
  let component: SynagoguePanelComponent;
  let fixture: ComponentFixture<SynagoguePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SynagoguePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SynagoguePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
