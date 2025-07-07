import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeedbackListComponent } from './admin-feedback-list.component';

describe('AdminFeedbackListComponent', () => {
  let component: AdminFeedbackListComponent;
  let fixture: ComponentFixture<AdminFeedbackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFeedbackListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFeedbackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
