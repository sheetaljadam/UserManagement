

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { RequestCacheService } from "./request-cache.service";

const TTL = 10;
@Injectable()
export class AuthService {

	/**
	   *
	   *
	   * @param {any} data
	   * @returns {Observable<any>}
	   *
	   */

	// loginUser;
	//login Api

	// isLogin() {
	// 	this.loginUser = JSON.parse(localStorage.getItem('user'));
	// 	if (this.loginUser != null) {
	// 		if (this.loginUser) {
	// 			return true;
	// 		}
	// 	} else {
	// 		return false;
	// 	}
	// }
	// getLoginUserData() {
	// 	if (JSON.parse(localStorage.getItem('user')) != null) {
	// 		return JSON.parse(localStorage.getItem('user'));
	// 	}

	// }
	public loading = new Subject();
	constructor(public router: Router,
		private cache: RequestCacheService) {
	}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.requestInterceptor();
		const cachedResponse = this.cache.get(req.url);
		return cachedResponse
			? Observable.of(cachedResponse)
			: next.handle(this.setAuthorizationHeader(req))
				.catch((event) => {
					console.log('event', event);
					if (event instanceof HttpErrorResponse) {
						this.cache.set(req.url, event, TTL);
						return this.catch401(event);
					}
				});
	}

	/**
	* Request interceptor.
	*/
	public requestInterceptor(): void {
		this.loading.next({
			loading: true, hasError: false, hasMsg: ''
		});
	}
	// Request Interceptor to append Authorization Header
	public setAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
		let headers: any,responseType: any;
	if ((req.url.indexOf('/api/sendchatMsg') != -1)) {
			headers = req.headers.append( "Accept", "application/json" );
		} else
		 {
			headers = req.headers.set('Content-Type', 'application/json; charset=UTF-8');

		}
		if ((req.url.indexOf('/api/downloadFile') != -1)) {
			responseType = 'blob'
			headers = req.headers.append( "Accept", "application/json" );
		} 
		return req.clone({ headers: headers,responseType:responseType});
		
	}
	// Response Interceptor
	public catch401(error: HttpErrorResponse): Observable<any> {
		// Check if we had 401 response
		if (error.status === 401) {
			// redirect to Login page for example
			return Observable.empty();
		} else if (error.status === 500) {
			return Observable.empty();

		}
		return Observable.throw(error);
	}

	sendRequest(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(req).do(event => {
			if (event instanceof HttpResponse) {
				this.cache.set(req.url, event, TTL);
			}
		});
	}
}
