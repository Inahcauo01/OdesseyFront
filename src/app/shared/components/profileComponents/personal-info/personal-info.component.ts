import { Component } from '@angular/core';
import {initFlowbite} from "flowbite";
import {UserService} from "../../../../core/services/user/user.service";
import {ToastrService} from "ngx-toastr";
import {CUser, User} from "../../../models/User";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent {

  editMode = false;
  userInfo: User = new CUser();
  oldPassword: string = '';
  identityDocuments: string[] = ['CIN', 'PASSPORT', 'CARTE_SEJOUR'];

  constructor(private userService: UserService,
              private toaster: ToastrService) { }

  ngOnInit(): void {
    initFlowbite();
    this.loadUser();
  }

  toggleEditMode(): void {
    this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
  }

  saveChanges(): void {
    // Check if the old password matches
    const username = this.extractUsernameFromToken(); // Get the username from token
    this.userService.verifyPassword(username, this.oldPassword).subscribe(
      (response: any) => {
        console.log("Response (old pwd valid) : ", response.result);
        if (response.result) {
          // Old password is correct, proceed with updating user
          this.userService.updateUser(this.userInfo).subscribe(
            (updateResponse: any) => {
              console.log("Update response: ", updateResponse);
              this.toaster.success('User updated successfully');
              this.editMode = false;
            },
            (updateError: any) => {
              console.log(updateError);
              this.toaster.error('Error updating user');
            }
          );
        } else {
          // Old password is incorrect, show error message
          this.toaster.error('Old password is incorrect');
        }
      },
      (error: any) => {
        console.log(error);
        this.toaster.error('Error verifying password');
      }
    );
  }

  private loadUser() {
    // get the username from the token and use it to load the user
    const username = this.extractUsernameFromToken();
    this.userService.getUserByUserName(username).subscribe(
      (response: any) => {
        this.userInfo = response.result;
        // console.table(response.result);
      },
      (error: any) => {
        console.log(error);
        this.toaster.error('Error loading user');
      }
    );
  }

  private extractUsernameFromToken() {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token){
        console.log('No token found');
        return '';
      }
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.sub;
    }catch (e) {
      console.log(e);
      return '';
    }
  }
}
