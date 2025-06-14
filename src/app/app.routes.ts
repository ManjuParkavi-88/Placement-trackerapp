import { Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { StudentLoginComponent } from './pages/student-login/student-login.component';     // Student login
import { AdminRegisterComponent } from './pages/admin-register/admin-register.component';
import { StudentRegisterComponent } from './pages/student-register/student-register.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'student-login', component: StudentLoginComponent },
  { path: 'admin-register', component: AdminRegisterComponent },   // ✅ Added
  { path: 'student-register', component: StudentRegisterComponent }, // ✅ Added
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent }
];
