import { Component } from '@angular/core';
import {initFlowbite} from "flowbite";
import {UserService} from "../../../core/services/user/user.service";
import {ToastrService} from "ngx-toastr";
import {CUser, User} from "../../../shared/models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailService} from "../../../core/services/email/email.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  users: User[] = [];
  userForm: FormGroup;

  constructor(private userService: UserService,
              private emailService: EmailService,
              private toaster: ToastrService,
              private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]], // only letters
      familyName: ['', Validators.required],
      identityDocument: ['', Validators.required],
      identityNumber: ['', Validators.required], // letters and numbers and length between 5 and 20
      email: ['', [Validators.required, Validators.email]],
      password: ['password'],
      role: ['USER']
    });
  }

  ngOnInit(): void {
    initFlowbite();
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data.result;
      console.log('Users loaded successfully:', this.users);
    }, (error) => {
      this.toaster.error('Error loading users');
      console.error('Error loading users', error);
    });
  }


  addUser(event: any) {
    event.preventDefault();
    console.log('User form:', this.userForm.value);
    if (this.userForm.valid) {
      this.userService.registerUser(this.userForm.value).subscribe(
        (response) => {
          this.toaster.success('User registered successfully');
          this.users.push(this.userForm.value);
          this.emailService.sendEmail(
            {
              to: this.userForm.value.email,
              subject: 'Odyssey Travel Group',
              text: `Dear ${this.userForm.value.name} ${this.userForm.value.familyName},<br><br>Thank you for joining us! We're excited to have you on board.<br><br>Your account details are as follows:<br><b>Username: "${this.userForm.value.username}"<br>Password: "${this.userForm.value.password}"</b><br><br>Feel free to log in and explore our platform.<br><br>Best regards,<br></b><br><br></b><br>The Admin Team at Odyssey Travel Group <br><br>PS: This is an automated email, please do not reply. <br><br> Odyssey Travel Group © 2024<br> All rights reserved.<br> 50000 Meknes, MOROCCO<br> +212 690329765`
            }
          ).subscribe(
            (response) => {
              this.toaster.success('Email sent successfully');
            }
          );
          this.userForm.reset();
        },
        (error) => {
          this.toaster.error('Error registering user');
          console.error('Error registering user', error);
        }
      );
    }else {
      this.toaster.error('Form is invalid');
    }
  }

  deleteUser(id?: number) {
    this.userService.deleteUser(id).subscribe(
      (response) => {
        this.toaster.success('User deleted successfully');
        console.log('User deleted successfully', response);
        this.users = this.users.filter(user => user.id !== id);
      },
      (error) => {
        this.toaster.error('Error deleting user');
        console.error('Error deleting user', error);
      }
    );
  }


}
