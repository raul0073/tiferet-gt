import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteButtonWithIconComponent } from './delete-button-with-icon.component';

describe('DeleteButtonWithIconComponent', () => {
  let component: DeleteButtonWithIconComponent;
  let fixture: ComponentFixture<DeleteButtonWithIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteButtonWithIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteButtonWithIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
