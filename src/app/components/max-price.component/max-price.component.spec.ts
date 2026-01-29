import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxPriceComponent } from './max-price.component';

describe('MaxPriceComponent', () => {
  let component: MaxPriceComponent;
  let fixture: ComponentFixture<MaxPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaxPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxPriceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
