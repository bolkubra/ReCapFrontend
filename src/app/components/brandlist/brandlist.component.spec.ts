import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandlistComponent } from './brandlistComponent';

describe('BrandlistComponent', () => {
  let component: BrandlistComponent;
  let fixture: ComponentFixture<BrandlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandlistComponent]
    });
    fixture = TestBed.createComponent(BrandlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});