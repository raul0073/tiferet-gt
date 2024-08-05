import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynagogueTansactionComponent } from './synagogue-tansaction.component';

describe('SynagogueTansactionComponent', () => {
  let component: SynagogueTansactionComponent;
  let fixture: ComponentFixture<SynagogueTansactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SynagogueTansactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SynagogueTansactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
