import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./shared/components/shared/layout/layout.component";
import {HomeComponent} from "./shared/components/home/home.component";
import {DestinationsComponent} from "./shared/components/destinations/destinations.component";
import {AdminLayoutComponent} from "./admin/sahred/admin-layout/admin-layout.component";
import {DashboardComponent} from "./admin/components/dashboard/dashboard.component";
import {TripsComponent} from "./admin/components/trips/trips.component";

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent},
      { path: 'destinations', component: DestinationsComponent},
  ]},

  { path: 'admin', component: AdminLayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'trips', component: TripsComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
