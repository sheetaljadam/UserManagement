import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpService } from '../../core/services/http.service';
@Injectable({
  providedIn: 'root'
})
export class ApiEndPointService {

	constructor(public http: HttpService) {

	}
    userRegistration(param): Observable < any > {
        return this.http.post('userRegistration', param,{withCredentials: true})
            ;
    }
	login(param): Observable < any > {
        return this.http.post('login', param);
    }
    logout(param): Observable < any > {
        return this.http.post('logout', param);
    }
    editUser(param): Observable < any > {
        return this.http.post('editUser', param,{withCredentials: true});
    }
    getUserDetails(param): Observable < any > {
        return this.http.post('getUserDetails', param,{withCredentials: true});
    }
    

}
