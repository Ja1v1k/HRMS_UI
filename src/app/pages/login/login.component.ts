import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { signup } from '../../data-type';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showLogin = false;
  authError:string = '';
  menuType:string ='seller'

constructor(private router:Router,
  private empSrv:EmployeeService , private auth:AuthService){

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
    localStorage.setItem('seller', JSON.stringify(res.body))
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

