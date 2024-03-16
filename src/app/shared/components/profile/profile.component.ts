import { Component } from '@angular/core';
import {UserService} from "../../../core/services/user/user.service";
import {ToastrService} from "ngx-toastr";
import {initFlowbite} from "flowbite";
import {User} from "../../models/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user?: User;

  constructor(private userService: UserService,
              private Toaster: ToastrService,
              ) { }

  ngOnInit(): void {
    initFlowbite();
  }



}
