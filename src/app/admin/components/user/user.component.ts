import { Component } from '@angular/core';
import {initFlowbite} from "flowbite";
import {UserService} from "../../../core/services/user/user.service";
import {ToastrService} from "ngx-toastr";
import {CUser, User} from "../../../shared/models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  users: User[] = [];
  userForm: FormGroup;

  constructor(private userService: UserService,
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
          console.log('User registered successfully', response);
          this.users.push(this.userForm.value);
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

  deleteUser(id: number | undefined) {
    this.toaster.warning('Not implemented yet');
  }


}
