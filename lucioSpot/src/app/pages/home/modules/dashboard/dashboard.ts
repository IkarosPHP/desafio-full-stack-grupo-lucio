import { ChangeDetectorRef, Component } from '@angular/core';
import { reservasService } from '../../../../services/reservas.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  mesas = new Map<number, string>([
    [1, 'mesa 1'],
    [2, 'mesa 2'],
    [3, 'mesa 3'],
    [4, 'mesa 4'],
    [5, 'mesa 5'],
    [6, 'mesa 6'],
  ]);

  horarios = new Map<number, string>([
    [1, '12h-12h30'],
    [2, '12h30-13h'],
    [3, '13h-13h30'],
  ]);
  today = new Date()
  reservas: any[] = [];
  totalReservas = 0;
  reservasAtivas = 0;
  reservasCanceladas = 0;
  percentualCanceladas = 0;
  horariosPico: { horario: string; total: number }[] = [];
  filtroStatus = '';
  filtroData: Date | null = null;
  filtroMesa = '';
  filtroHorario = '';
  filtroUsuario = '';

  selectedDay: Date | null = null;

  constructor(private reservasService: reservasService, private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.reservasService.listarReservasAdmin().subscribe((reservas) => {
      this.reservas = reservas;
      this.calcularKPIs();
      this.cdr.detectChanges();
    });
  }

  get reservasFiltradas() {
    return this.reservas.filter((reserva) => {
      const statusValido = !this.filtroStatus || this.getStatus(reserva) === this.filtroStatus;
      const dataValida =
        !this.filtroData ||
        new Date(reserva.data).toDateString() === this.filtroData.toDateString();
      const mesaValida = !this.filtroMesa || reserva.idMesa === this.filtroMesa;
      const horarioValido = !this.filtroHorario || reserva.idHorario === this.filtroHorario;
      const usuarioValido = !this.filtroUsuario || reserva.usuario.includes(this.filtroUsuario);
      return statusValido && dataValida && mesaValida && horarioValido && usuarioValido;
    });
  }

    onDateChange() {
    if (this.selectedDay) {
      this.reservasService.buscarReservasPorDia(this.selectedDay);
    }
  }

  get mesasArray() {
    return Array.from(this.mesas.entries()).map(([id, nome]) => ({ id, nome }));
  }

  calcularKPIs() {
    this.totalReservas = this.reservas.length;
    this.reservasAtivas = this.reservas.filter((r) => !r.isCancelada).length;
    this.reservasCanceladas = this.reservas.filter((r) => r.isCancelada).length;
    this.percentualCanceladas = (this.reservasCanceladas / (this.totalReservas || 1)) * 100;
    const horariosMap = new Map<number, number>();
    for (const r of this.reservas) {
      const chave = r.idHorario;
      horariosMap.set(chave, (horariosMap.get(chave) || 0) + 1);
    }
    this.horariosPico = Array.from(horariosMap.entries())
      .map(([id, total]) => ({ horario: this.horarios.get(id) || id.toString(), total }))
      .sort((a, b) => b.total - a.total);
  }

  getStatus(reserva: any): string {
    if (reserva.isCancelada) {
      return 'Cancelada';
    }
    const dia = new Date(reserva.data);
    const hoje = new Date();
    dia.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);
    if (dia < hoje) {
      return 'Concluída';
    }
    return 'Ativa';
  }

  get horariosArray() {
  return Array.from(this.horarios.entries()).map(([id, horario]) => ({ id, horario }));
}


  timestampToDate(timestamp: { _seconds: number; _nanoseconds: number }): string {
    const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
    return date.toLocaleString('pt-BR');
  }
}
