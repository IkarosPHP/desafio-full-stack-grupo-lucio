import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { reservasService } from '../../../../services/reservas.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../dialog/dialog';

@Component({
  selector: 'app-reservas-list',
  templateUrl: './lista-reservas.html',
  styleUrls: ['./lista-reservas.css'],
  imports: [CommonModule],
})
export class ReservasListComponent implements OnInit {
  reservas: any[] = [];

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

  constructor(
    private reservasService: reservasService,
    private cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog
  ) {}

  loading: boolean = true;

  ngOnInit() {
    this.buscarReservas();
  }

  buscarReservas() {
    this.reservasService.listarReservas().subscribe((data) => {
      this.reservas = [...data];
      this.cdr.detectChanges();
    });
  }

  timestampToDate(timestamp: { _seconds: number; _nanoseconds: number }): string {
    const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
    return date.toLocaleString('pt-BR');
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

  cancelarReserva(reserva: any) {
    if (this.getStatus(reserva) !== 'Ativa') return;
    this.dialog
      .open(Dialog, { data: reserva })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.buscarReservas();
          this.cdr.detectChanges();
        }
      });
  }
}
