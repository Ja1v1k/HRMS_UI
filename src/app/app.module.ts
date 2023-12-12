import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './pages/employee/employee.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { LeaveComponent } from './pages/leave/leave.component';
import { SalaryComponent } from './pages/salary/salary.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from'@angular/common/http'
import { FullCalendarModule } from '@fullcalendar/angular';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Leave1Component } from './pages/leave1/leave1.component';
import { MaterialModule } from './material.modules';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TokenInterceptor } from './Interceptor/token.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        EmployeeComponent,
        AttendanceComponent,
        LeaveComponent,
        SalaryComponent,
        HomeComponent,
        SignupComponent,
        Leave1Component,
        SidebarComponent,
        FooterComponent,
        HeaderComponent
        
    ],
    providers: [DatePipe,{
        provide:HTTP_INTERCEPTORS,
        useClass:TokenInterceptor,
        multi:true
      }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FullCalendarModule,
        BrowserAnimationsModule,
        MaterialModule, // register FullCalendar with your app
    ]
})
export class AppModule { }
