import { HttpClient } from '@angular/common/http';
/**
 * Http Intercepter Service
 * TODO: Add Loader and Toasty Service currently using console log
 * for showing errors and response and request completion;
 */
import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';

import { BehaviorSubject } from 'rxjs/Rx';
import { NgProgressRef, NgProgress } from '@ngx-progressbar/core';

@Injectable()
export class HttpService {
	public loading = new BehaviorSubject<any>({
			loading: true, hasError: false, hasMsg: ''
		});
	progressRef: NgProgressRef;
	public isLogout$ = new BehaviorSubject<any>(false);
	
	constructor(
		public http: HttpClient,
    private progress: NgProgress
	) {
		//this.http(backend, defaultOptions);
		this.progressRef = progress.ref('myProgress');
	}

	/**
	 * Performs any type of http request.
	 * @param url
	 * @param options
	 * @returns {Observable<Response>}
	 */
	/*request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
	  return this.http.request(url, options);
	}*/

	/**
	 * Performs a request with `get` http method.
	 * @param url
	 * @param options
	 * @returns {Observable<>}
	 */
	get(url: string): Observable<any> {
		// this.requestInterceptor();
		return this.http.get(url)
			.catch(this.onCatch.bind(this))
			.do((res: Response) => {
				this.onSubscribeSuccess(res);
			}, (error: any) => {
				this.onSubscribeError(error);
			})
			.finally(() => {
				this.onFinally();
			});
	}

	getLocal(url: string): Observable<any> {
		return this.http.get(url);
	}

	/**
	 * Performs a request with `post` http method.
	 * @param url
	 * @param body
	 * @param options
	 * @returns {Observable<>}
	 */
	post(url: string, body: any, type?: any): Observable<any> {
		if (type != 'backgroundApi') {
			this.requestInterceptor();
		}
		return this.http.post(this.getFullUrl(url), body)
			.catch(this.onCatch.bind(this))
			.do((res: Response) => {
				this.onSubscribeSuccess(res);
			}, (error: any) => {
				this.onSubscribeError(error);
			})
			.finally(() => {
				this.onFinally();
			});
	}
	/**
	 * Performs a request with `put` http method.
	 * @param url
	 * @param body
	 * @param options
	 * @returns {Observable<>}
	 */
	put(url: string, body: any): Observable<any> {
		this.requestInterceptor();
		return this.http.put(this.getFullUrl(url), body)
			.catch(this.onCatch.bind(this))
			.do((res: Response) => {
				this.onSubscribeSuccess(res);
			}, (error: any) => {
				this.onSubscribeError(error);
			})
			.finally(() => {
				this.onFinally();
			});
	}

	/**
	 * Performs a request with `delete` http method.
	 * @param url
	 * @param options
	 * @returns {Observable<>}
	 */
	delete(url: string): Observable<any> {
		this.requestInterceptor();
		return this.http.delete(this.getFullUrl(url))
			.catch(this.onCatch.bind(this))
			.do((res: Response) => {
				this.onSubscribeSuccess(res);
			}, (error: any) => {
				this.onSubscribeError(error);
			})
			.finally(() => {
				this.onFinally();
			});
	}



	/**
	 * Build API url.
	 * @param url
	 * @returns {string}
	 */
	public getFullUrl(url: string): string {
		return environment.API_ENDPOINT + url;
		//return 'http://192.168.88.30:3000/api/' + url;
	}

	/**
	 * Request interceptor.
	 */
	public requestInterceptor(): void {
		this.progressRef.start();
		this.loading.next({
			loading: true, hasError: false, hasMsg: ''
		});
	}

	/**
	 * Response interceptor.
	 */
	public responseInterceptor(): void {
		/** request completed */
		this.progressRef.complete();
		
		this.loading.next({
			loading: false, hasError: false, hasMsg: ''
		});
	}

	/**
	 * Error handler.
	 * @param error
	 * @param caught
	 * @returns {ErrorObservable}
	 */
	public onCatch(error: any, caught: Observable<any>): Observable<any> {
		console.log('Something went terrible wrong and error is', error);
		this.loading.next({
			loading: false, hasError: true, hasMsg: 'Something went terrible wrong and error is'
		});
		this.progressRef.complete();
		return Observable.of(error);
	}

	/**
	 * onSubscribeSuccess
	 * @param res
	 */
	public onSubscribeSuccess(res): void {
		if(res.hasOwnProperty('success') && res.hasOwnProperty('message') && res.message) {
			if (res.statusCode == 'session_expire_code') {
				this.isLogout$.next(true);
            } 
         } 
       
		setTimeout(() => {
			this.loading.next({
				loading: false, hasError: false, hasMsg: ''
			});
			this.progressRef.complete();
		}, 5);
	}

	/**
	 * onSubscribeError
	 * @param error
	 */
	public onSubscribeError(error: any): void {
		console.log('Something Went wrong while subscribing', error);
		setTimeout(() => {
			this.loading.next({
				loading: false, hasError: true, hasMsg: 'Something went wrong'
			});
			this.progressRef.complete();
		}, 5);
	}

	/**
	 * onFinally
	 */
	public onFinally(): void {
		this.responseInterceptor();
	}
}
