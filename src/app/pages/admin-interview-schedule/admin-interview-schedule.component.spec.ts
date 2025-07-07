import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInterviewScheduleComponent } from './admin-interview-schedule.component';

describe('AdminInterviewScheduleComponent', () => {
  let component: AdminInterviewScheduleComponent;
  let fixture: ComponentFixture<AdminInterviewScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInterviewScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInterviewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
