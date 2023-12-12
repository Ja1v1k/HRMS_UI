import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/ResetPassword.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private baseUrl: string = "https://localhost:7228/api/User"

  constructor(private http: HttpClient) { }

  sendResetPasswordLink(email: string) {
    return this.http.post<any>(`${this.baseUrl}/send-email-reset/${email}`, {})
  }

  resetPassword(resetPasswordObj: ResetPassword) {
    return this.http.post<any>(`${this.baseUrl}/reset-password`,resetPasswordObj)
  }
}
