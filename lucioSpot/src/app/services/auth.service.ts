import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


interface LoginResponse {
  idToken: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly BASE_URL = environment.backendUrl;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private readonly router: Router) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/auth/login`, { email, password })
      .pipe(
        tap(resp => {
          const isAdmin = resp.isAdmin ? 'Sim' : 'Não'
          localStorage.setItem(this.TOKEN_KEY, resp.idToken)
          localStorage.setItem('isAdmin', isAdmin)
          this.scheduleAutoLogout(resp.idToken)
        }),
        map(() => true)
      );
  }

  scheduleAutoLogout(token: string) {
    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    console.log(expirationDate)
    if (!expirationDate) return;

    const timeLeft = expirationDate.getTime() - Date.now();

    setTimeout(() => {
      this.logout();
    }, timeLeft);
  }

  register(name: string, email: string, password: string){
    return this.http.post<LoginResponse>(`${this.BASE_URL}/auth/register`, {
      displayName: name,
      email,
      password
    })
      .pipe(
        tap(resp => {
          const isAdmin = resp.isAdmin ? 'Sim' : 'Não'
          localStorage.setItem(this.TOKEN_KEY, resp.idToken)
          localStorage.setItem('isAdmin', isAdmin)
          this.scheduleAutoLogout(resp.idToken)
        }),
        map(() => true)
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
