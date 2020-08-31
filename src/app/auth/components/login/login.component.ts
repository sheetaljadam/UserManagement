import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiEndPointService } from './../../../core/services/api-end-point.service';
import { CommanService } from './../../../core/services/comman.service';
import { Util } from './../../../core/resources/util';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	loading = false;
	constructor(private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private apiEndPointService: ApiEndPointService,
		private commanService: CommanService) { }

	ngOnInit() {
		let util = new Util();
		let userDetail = util.getRememberPassword();
		if (userDetail == null || !userDetail) {
			userDetail = {
				email: '',
				password: '',
				rememberMe: false
			}
		}
		this.loginForm = this.formBuilder.group({
			email: [userDetail.email, Validators.required],
			password: [userDetail.password, Validators.required],
			rememberMe: [userDetail.rememberMe],
		});
	}
	getErrorMessage(type) {
		switch (type) {
			case "email":
				return this.loginForm.get('email').hasError('required') ? 'Email required' : '';
			case "pass":
				return this.loginForm.get('password').hasError('required') ? 'Password required' : '';
			default:
				return 'Please fill all details';
		}
	}

	onSubmit() {
		let util = new Util()
		if (!this.loginForm.valid) {
			this.commanService.makeFormFieldTouched(this.loginForm.controls);
			return;
		} else {
			let param = {
				email: this.loginForm.value.email,
				password: this.loginForm.value.password,
				rememberMe: this.loginForm.value.rememberMe == true ? 1 : 0,
			}
			this.apiEndPointService.login(param).subscribe((result: any) => {
				if (result.status) {
					result.data[0]['email'] = this.loginForm.value.email
					util.setLoginUser(result.data[0])
					if (this.loginForm.value.rememberMe == true) {
						util.setRememberPassword({ "email": this.loginForm.value.email, "password": this.loginForm.value.password, "rememberMe": this.loginForm.value.rememberMe });
					} else {
						util.removeRememberPassword();
					}
					this.router.navigate(['/user/user']);
				} else {
					alert(result.message);
				}
			}, error => {
				alert(error);
			});

		}
	}
}
