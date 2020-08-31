export class Util {
	
	constructor() { }

	getLoginUser() {
		let user: any = localStorage.getItem('userDetails') != "undefined" ? (localStorage.getItem('userDetails')) : null;
		if (user) {
			user = JSON.parse(window.atob(user));
		}
		return user;
	}
	setLoginUser(data) {
		let enc = window.btoa(JSON.stringify(data));
		localStorage.setItem('userDetails', enc);
	}
	//remove remember detail
	removeLoginUser() {
		localStorage.removeItem('userDetails');
    }
	//set remember detail
	setRememberPassword(val) {
		let enc = window.btoa(JSON.stringify(val));
		localStorage.setItem('uDRememberMe', enc);
	}
	//get remember detail
	getRememberPassword() {
		let rememberUsr: any = localStorage.getItem('uDRememberMe') != "undefined" ? (localStorage.getItem('uDRememberMe')) : null;
		if (rememberUsr) {
			rememberUsr = JSON.parse(window.atob(rememberUsr));
		}
		return rememberUsr;
	}
	//remove remember detail
	removeRememberPassword() {
		localStorage.removeItem('uDRememberMe');
    }
}