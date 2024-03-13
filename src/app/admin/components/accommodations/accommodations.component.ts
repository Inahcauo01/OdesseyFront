import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {initFlowbite} from "flowbite";
import {ToastrService} from "ngx-toastr";
import {AccommodationService} from "../../../core/services/accommodation/accommodation.service";
import {Accommodation, CAccommodation} from "../../../shared/models/Accommodation";

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrl: './accommodations.component.css'
})
export class AccommodationsComponent {
  accommodations: any[] = [];
  accommodationToSave: Accommodation = new CAccommodation();
  imageFile?: File;


  constructor(private http: HttpClient,
              private toaster: ToastrService,
              private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    initFlowbite();
    this.getAccommodations();
  }

  getAccommodations(): void {
    this.http.get('http://localhost:8080/api/v1/accommodation').subscribe((data: any) => {
      this.accommodations = data.result;
    }, (error) => {
      console.error('Error loading accommodations', error);
    });
  }

  onSubmit() {
    this.accommodationService.saveAccommodation(this.accommodationToSave, this.imageFile || new File([], 'default_filename'))
      .subscribe((response:any) => {
        this.accommodations.push(response.result);
        console.log('Accommodation created successfully:', response);
        this.toaster.success('Accommodation created successfully');
      }, error => {
        console.error('Error creating accommodation:', error);
        if (error.errors.isArray()) {
          error.errors.forEach((error: any) => {
            this.toaster.error(error.message);
          });
        }else {
          this.toaster.error(error.message);
        }
      });
  }

  onImageSelected($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.imageFile = input.files[0];
    }
  }
}
