import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly BASE_URL = environment.backendUrl;

  constructor(private http: HttpClient) {}

  listarUsuarios() {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`${this.BASE_URL}/usuarios`, { headers });
  }

  atualizarAdmin(uid: string, isAdmin: boolean) {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log('aqui')
    return this.http.put<any[]>(`${this.BASE_URL}/usuarios`,{uid, isAdmin}, { headers });
  }
}
