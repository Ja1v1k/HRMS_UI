import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { signup } from '../../data-type';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showLogin = false;
  authError:string = '';
  menuType:string ='seller'
  isLoginError = new EventEmitter<boolean>(false)
constructor(private router:Router,
  private empSrv:EmployeeService , private auth:AuthService,private userStore:UserStoreService){

}
ngOnInit(): void {
  this.empSrv.reloadSeller()

}

RegisterForm(data:signup): void{
  console.log(data)

  this.empSrv.userSignUp(data);
}

login(data:any){  
  // console.log(data)
  this.empSrv.userLogin(data);
  this.auth.login(data).subscribe((res:any) => {
    this.auth.setToken(res.token)
    this.router.navigate(['dashboard'])
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);          
          this.router.navigate(['dashboard'])
  }
    
    
  )
}

openLogin( ){
  this.showLogin=true
}



openRegister(){
  this.showLogin=false
  this.router.navigate(['signup'])

}

}

