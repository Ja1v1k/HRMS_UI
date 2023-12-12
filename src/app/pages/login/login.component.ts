import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { signup } from '../../data-type';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ResetPassword } from 'src/app/models/ResetPassword.model';
import { ResetPasswordService } from 'src/app/service/reset-password.service';
const defaultDialogConfig = new MatDialogConfig();

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
  email:string;
  config = {
    disableClose: true,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '',
    height: '60%',
    minWidth: '',
    minHeight: '',
    maxWidth: defaultDialogConfig.maxWidth,
    maxHeight: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },}

constructor(private router:Router,
  private empSrv:EmployeeService , private auth:AuthService,private userStore:UserStoreService,private dialog: MatDialog,private resetPassword:ResetPasswordService){

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

openpopup(templateRef) {
  let dialogRef = this.dialog.open(templateRef, this.config);
  dialogRef.disableClose = true;

  dialogRef.backdropClick().subscribe(_ => {
    dialogRef.close();

  })
}

sendEmail(){
  debugger
  this.resetPassword.sendResetPasswordLink(this.email).subscribe(res=>console.log(res))
}

}

