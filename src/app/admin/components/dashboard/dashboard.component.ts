import {Component} from '@angular/core';
import {initFlowbite} from "flowbite";
import {Flowbite} from "../../../config/flowbite";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

@Flowbite()
export class DashboardComponent {

  constructor() {
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
