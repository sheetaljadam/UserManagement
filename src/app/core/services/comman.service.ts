import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpService } from '../../core/services/http.service';
import { Router,NavigationEnd,ActivatedRoute,RoutesRecognized }  from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommanService {
/**
	*
	*
	* @param {any} data
	* @returns {Observable<any>}
	*
	*/
	public previousUrlArray;
	
	constructor(private http: HttpService,
		 private router: Router) {
			
		}
	checkToken(result) {
		alert(result.message);
		if (result.message == 'Token expired.') {
			localStorage.clear();
			this.router.navigate(['/Login']);
		}
	}
	checkPreviousUrl() {
		this.router.events
		.filter((e: any) => e instanceof RoutesRecognized)
		.pairwise()
		.subscribe((e: any) => {
			if (e) {
				this.previousUrlArray = [];
				this.previousUrlArray.push(e[0]);
				return this.previousUrlArray;
			}
			return this.previousUrlArray;
		});
	}

	getLastUrl() {
		return this.previousUrlArray;
	}
	//form touch on submit
	makeFormFieldTouched(controls) {
		for (let i in controls)
			controls[i].markAsTouched();
	}
	
	/*Localstorage*/
	setData(key: string, value: any) {
        if (value) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }
    getData(key: string){
        let value: string = localStorage.getItem(key);

        if (value && value != "undefined" && value != "null") {
            return JSON.parse(value);
        }
        else{
        	return null;
        }
    }
	
}
