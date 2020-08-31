import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiEndPointService } from './../../../core/services/api-end-point.service';
import { CommanService } from './../../../core/services/comman.service';
import { ValidationService } from './../../../core/services/validation.service';
import { Util } from './../../../core/resources/util';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
	registerForm: FormGroup;
	loading = false;
	userId = '';
	constructor(private formBuilder: FormBuilder,
		private router: Router,
		private apiEndPointService: ApiEndPointService,
		private commanService: CommanService,
		private validator: ValidationService,
		public route: ActivatedRoute) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(30)]],
			email: ['', [Validators.required, this.validator.validateEmail]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}
	getErrorMessage(type) {
		switch (type) {
			case "name":
				return this.registerForm.get('name').hasError('required') ? 'Name required' : this.registerForm.get('name').hasError('maxlength') ? 'User name maximum length 30' : '';
			case "email":
				return this.registerForm.get('email').hasError('required') ? 'Email required' : !this.registerForm.get('email').valid ? 'Please enter valid email' : '';
			case "password":
				return this.registerForm.get('password').hasError('required') ? 'Password required' : this.registerForm.get('password').hasError('minlength') ? 'Password atleast 6 character long' : '';
			default:
				return 'Please fill all details';
		}
	}
	onSubmit() {
		if (!this.registerForm.valid) {
			this.commanService.makeFormFieldTouched(this.registerForm.controls);
			return;
		} else {
			this.apiEndPointService.userRegistration(this.registerForm.value).subscribe((result: any) => {
				if (result.status) {
					alert('Registration Successfully')
					this.router.navigate(['/auth/login']);
				} else {
					alert(result.message)
				}
			}, error => {
				console.log(error);
			});
		}
	}
}
