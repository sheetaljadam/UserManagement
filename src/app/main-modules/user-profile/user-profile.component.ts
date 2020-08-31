import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Util } from 'src/app/core/resources/util';
import { ApiEndPointService } from './../../core/services/api-end-point.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user: any;
  constructor(private router: Router,
    private apiEndPointService:ApiEndPointService,) { }

  ngOnInit() {
    let util = new Util()
    debugger
    let user = util.getLoginUser()
    if(user){
      this.user = user;
      this.getUserDetails()
    }
  }
  editUser(){
    this.router.navigate(['/user/usr/',this.user.uId]);
  }
  getUserDetails(){
    let util = new Util()
    this.apiEndPointService.getUserDetails({usrId:this.user.uId,token: this.user.token}).subscribe((result: any)=> { 
      if(result.status){
        this.user = Object.assign(this.user, result.data[0]);
        util.setLoginUser(this.user)
      }else{
        alert(result.message)
        if(result.statusCode == 101)
            {
              util.removeLoginUser();
              this.router.navigate(['/auth/login']);
            }
      }
    },error => {
      console.log(error);
    });
  }
}
