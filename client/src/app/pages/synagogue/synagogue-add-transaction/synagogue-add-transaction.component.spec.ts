import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynagogueAddTransactionComponent } from './synagogue-add-transaction.component';

describe('SynagogueAddTransactionComponent', () => {
  let component: SynagogueAddTransactionComponent;
  let fixture: ComponentFixture<SynagogueAddTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SynagogueAddTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SynagogueAddTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
