import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorlistComponent } from './colorlist.component';

describe('ColorlistComponent', () => {
  let component: ColorlistComponent;
  let fixture: ComponentFixture<ColorlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorlistComponent]
    });
    fixture = TestBed.createComponent(ColorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
