import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiEndPointService } from './../../core/services/api-end-point.service';
import { CommanService } from './../../core/services/comman.service';
import { ValidationService } from './../../core/services/validation.service';
import { Util } from './../../core/resources/util';
import { utils } from 'protractor';
@Component({
	selector: 'app-edit-user',
	templateUrl: './edit-user.component.html',
	styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
	editUserForm: FormGroup;
	loading = false;
	userId = '';
	user: any;
	constructor(private formBuilder: FormBuilder,
		private router: Router,
		private apiEndPointService: ApiEndPointService,
		private commanService: CommanService,
		private validator: ValidationService,
		public route: ActivatedRoute) { }

	ngOnInit() {
		this.editUserForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(30)]],
			email: ['', [Validators.required, this.validator.validateEmail]],
			password: ['', [Validators.minLength(6)]]
		});
		this.route.params.subscribe(params => {
			this.userId = this.route.snapshot.paramMap.get('id');
			let util = new Util()
			this.user = util.getLoginUser()
			if (this.user != null) {
				this.editUserForm.patchValue({
					name: this.user.name,
					email: this.user.email,
					password: ''
				})
			}
		});
		this.onPassChanges()
	}
	onPassChanges() {
		this.editUserForm.get('password').valueChanges.subscribe(val => {
			if (val) {
				this.editUserForm.controls['password'].setValidators([Validators.minLength(6)]);
				this.editUserForm.controls['password'].updateValueAndValidity();
			} else {
				this.editUserForm.controls['password'].setValidators([]);
				this.editUserForm.controls['password'].updateValueAndValidity();
			}

		});
	}
	getErrorMessage(type) {
		switch (type) {
			case "name":
				return this.editUserForm.get('name').hasError('required') ? 'Name required' : this.editUserForm.get('name').hasError('maxlength') ? 'User name maximum length 30' : '';
			case "email":
				return this.editUserForm.get('email').hasError('required') ? 'Email required' : !this.editUserForm.get('email').valid ? 'Please enter valid email' : '';
			case "password":
				return this.editUserForm.get('password').hasError('required') ? 'Password required' : this.editUserForm.get('password').hasError('minlength') ? 'Password atleast 6 character long' : '';
			default:
				return 'Please fill all details';
		}
	}
	onSubmit() {
		if (!this.editUserForm.valid) {
			this.commanService.makeFormFieldTouched(this.editUserForm.controls);
			return;
		} else {
			let util = new Util()
			let param = this.editUserForm.value;
			param['usrId'] = this.userId,
				param['token'] = this.user.token
			this.apiEndPointService.editUser(param).subscribe((result: any) => {
				if (result.status) {
					alert('User Update Successfully')
					let userDetail = util.getRememberPassword();
					if (!(userDetail == null || !userDetail)) {
						util.setRememberPassword({ "email": this.editUserForm.value.email, "password": this.editUserForm.value.password != '' ? this.editUserForm.value.password : userDetail.password, "rememberMe": userDetail.rememberMe });
					}
						this.router.navigate(['/user/user']);
					} else {
						alert(result.message)
						if (result.statusCode == 101) {
							util.removeLoginUser();
							this.router.navigate(['/auth/login']);
						}
					}
				}, error => {
					console.log(error);
				});
		}
	}
}
