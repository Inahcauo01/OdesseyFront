import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./components/shared/layout/layout.component";
import {HomeComponent} from "./components/home/home.component";
import {DestinationsComponent} from "./components/destinations/destinations.component";

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent},
      { path: 'destinations', component: DestinationsComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
