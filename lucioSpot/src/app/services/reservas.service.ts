import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class reservasService {
  private readonly BASE_URL = environment.backendUrl;
  constructor(private http: HttpClient) {}

  enviarReserva(reserva: any) {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.BASE_URL}/reservas`, reserva, { headers })
  }

  listarReservas(): Observable<any[]> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`${this.BASE_URL}/reservas`, { headers });
  }

  buscarReservasPorDia(data: Date){
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log(data.toISOString().split('T')[0])
    return this.http.get<any[]>(`${this.BASE_URL}/reservas/dia/${data.toISOString().split('T')[0]}`, { headers });
  }

  cancelarReserva(id: string){
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.BASE_URL}/reservas/cancelar/${id}`,{ } ,{ headers })
  }

  listarReservasAdmin(){
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`${this.BASE_URL}/reservas/kpi`, { headers });
  }
}
