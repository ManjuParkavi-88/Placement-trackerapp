import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobPostComponent } from './admin-job-post.component';

describe('AdminJobPostComponent', () => {
  let component: AdminJobPostComponent;
  let fixture: ComponentFixture<AdminJobPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminJobPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJobPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
