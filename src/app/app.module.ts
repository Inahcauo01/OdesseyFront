import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/shared/header/header.component';
import { FooterComponent } from './shared/components/shared/footer/footer.component';
import { LayoutComponent } from './shared/components/shared/layout/layout.component';
import { HomeComponent } from './shared/components/home/home.component';
import { DestinationsComponent } from './shared/components/destinations/destinations.component';
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './admin/shared/navbar/navbar.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin/shared/admin-layout/admin-layout.component';
import { TripsComponent } from './admin/components/trips/trips.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import { CalendarComponent } from './admin/components/calendar/calendar.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {LoginComponent} from "./shared/components/auth/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AccommodationsComponent } from './admin/components/accommodations/accommodations.component';
import { TripDetailsComponent } from './shared/components/trip-details/trip-details.component';
import { UserComponent } from './admin/components/user/user.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { PersonalInfoComponent } from './shared/components/profileComponents/personal-info/personal-info.component';
import { HistoryComponent } from './shared/components/profileComponents/history/history.component';
import { MyReservationsComponent } from './shared/components/profileComponents/my-reservations/my-reservations.component';
import {ChartModule} from "primeng/chart";
import { OverviewComponent } from './admin/components/overview/overview.component';
import { ReservationPageComponent } from './shared/components/reservation-page/reservation-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    HomeComponent,
    DestinationsComponent,
    NavbarComponent,
    DashboardComponent,
    AdminLayoutComponent,
    TripsComponent,
    CalendarComponent,
    LoginComponent,
    AccommodationsComponent,
    TripDetailsComponent,
    UserComponent,
    ProfileComponent,
    PersonalInfoComponent,
    HistoryComponent,
    MyReservationsComponent,
    OverviewComponent,
    ReservationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
