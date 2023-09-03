import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostomerComponent } from './costomer.component';

describe('CostomerComponent', () => {
  let component: CostomerComponent;
  let fixture: ComponentFixture<CostomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostomerComponent]
    });
    fixture = TestBed.createComponent(CostomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
