import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrainings } from './manage-trainings.component';

describe('ManageTrainings', () => {
  let component: ManageTrainings;
  let fixture: ComponentFixture<ManageTrainings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTrainings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTrainings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
