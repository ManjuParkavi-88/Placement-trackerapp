import { Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { StudentLoginComponent } from './pages/student-login/student-login.component';
import { AdminRegisterComponent } from './pages/admin-register/admin-register.component';
import { StudentRegisterComponent } from './pages/student-register/student-register.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'student-login', component: StudentLoginComponent },
  { path: 'admin-register', component: AdminRegisterComponent },
  { path: 'student-register', component: StudentRegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent },

  // ✅ Add this route for Interview Scheduling tab
  {
    path: 'admin/interview-scheduler',
    loadComponent: () =>
      import('./pages/admin-interview-schedule/admin-interview-schedule.component').then(
        (m) => m.AdminInterviewScheduleComponent
      )
  },

  { path: '**', redirectTo: 'welcome' }
];
