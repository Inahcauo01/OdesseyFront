import { Component } from '@angular/core';
import {initFlowbite} from "flowbite";
import {UserService} from "../../../core/services/user/user.service";
import {ToastrService} from "ngx-toastr";
import {CUser, User} from "../../../shared/models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailService} from "../../../core/services/email/email.service";
import {Flowbite} from "../../../config/flowbite";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

@Flowbite()
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
    this.getAllUsers();
    initFlowbite();
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
              // text: `Dear ${this.userForm.value.name} ${this.userForm.value.familyName},<br><br>Thank you for joining us! We're excited to have you on board.<br><br>Your account details are as follows:<br><b>Username: "${this.userForm.value.username}"<br>Password: "${this.userForm.value.password}"</b><br><br>Feel free to log in and explore our platform.<br><br>Best regards,<br></b><br><br></b><br>The Admin Team at Odyssey Travel Group <br><br>PS: This is an automated email, please do not reply. <br><br> Odyssey Travel Group © 2024<br> All rights reserved.<br> 50000 Meknes, MOROCCO<br> +212 690329765`
              text: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; font-family: Arial, sans-serif;">
                  <div style="font-size: 1.2rem; font-weight: 600; color: var(--text-dark); cursor: pointer;">ODYSSEY<span style="color: var(--primary-color);">.</span></div>
                  <div style="line-height: 1.6;">
                      <p>
                          Dear ${this.userForm.value.name} ${this.userForm.value.familyName},
                      </p>
                      <p>
                          Thank you for joining us! We're excited to have you on board.
                      </p>
                      <p>
                          Your account details are as follows:
                      </p>
                      <p style="font-weight: bold;">
                          Username: "${this.userForm.value.username}"<br>
                          Password: "${this.userForm.value.password}"
                      </p>
                      <p>
                          Feel free to log in and explore our platform.
                      </p>
                      <p>
                          Best regards,
                          <br>
                          The Admin Team at Odyssey Travel Group
                      </p>
                      <p style="font-size: 0.8rem;">
                          PS: This is an automated email, please do not reply.
                      </p>
                      <p style="font-size: 0.8rem;">
                          Odyssey Travel Group © 2024<br>
                          All rights reserved.<br>
                          50000 Meknes, MOROCCO<br>
                          +212 690329765
                      </p>
                  </div>
                </div>
              `
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
