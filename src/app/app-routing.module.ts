import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./shared/components/shared/layout/layout.component";
import {HomeComponent} from "./shared/components/home/home.component";
import {DestinationsComponent} from "./shared/components/destinations/destinations.component";
import {AdminLayoutComponent} from "./admin/shared/admin-layout/admin-layout.component";
import {DashboardComponent} from "./admin/components/dashboard/dashboard.component";
import {TripsComponent} from "./admin/components/trips/trips.component";
import {CalendarComponent} from "./admin/components/calendar/calendar.component";
import {LoginComponent} from "./shared/components/auth/login/login.component";
import {AccommodationsComponent} from "./admin/components/accommodations/accommodations.component";
import {TripDetailsComponent} from "./shared/components/trip-details/trip-details.component";
import {UserComponent} from "./admin/components/user/user.component";
import {ProfileComponent} from "./shared/components/profile/profile.component";
import {PersonalInfoComponent} from "./shared/components/profileComponents/personal-info/personal-info.component";
import {MyReservationsComponent} from "./shared/components/profileComponents/my-reservations/my-reservations.component";
import {HistoryComponent} from "./shared/components/profileComponents/history/history.component";
import {OverviewComponent} from "./admin/components/overview/overview.component";

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent},
      { path: 'destinations', component: DestinationsComponent},
      { path: 'trip-details/:id', component: TripDetailsComponent },
  ]},

  { path: 'admin', component: AdminLayoutComponent, children: [
      { path: 'dashboard', component: OverviewComponent},
      { path: 'trips', component: TripsComponent},
      { path: 'calendar', component: CalendarComponent},
      { path: 'accommodations', component: AccommodationsComponent},
      { path: 'users', component: UserComponent}
  ]},

  { path: 'profile', component: ProfileComponent, children: [
      { path: 'personal-info', component: PersonalInfoComponent },
      { path: 'my-reservation', component: MyReservationsComponent },
      { path: 'my-history', component: HistoryComponent }
  ]},

  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
