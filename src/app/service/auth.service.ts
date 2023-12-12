import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/TokenApi.Model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = "https://localhost:7228/api/User"
  constructor(private http : HttpClient,private router:Router) { }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}/register`, userObj)
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}/login`, loginObj)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
  
  setToken(tokenValue:string){
    localStorage.setItem("token",tokenValue);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem("token")
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token:string = this.getToken();
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.decodedToken())
    return this.decodedToken().name;
  }

  getRoleFromToken(){
    if(this.decodedToken())
    return this.decodedToken().role;
  }

  renewToken(tokenApi : TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}/refresh`, tokenApi)
  }

  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }

}
