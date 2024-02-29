import { Component } from '@angular/core';
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'odesseyFront';

  ngOnInit(): void {
    initFlowbite();
  }
}
