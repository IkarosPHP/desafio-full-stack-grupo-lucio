import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { reservasService } from '../../../../services/reservas.service';

interface Slot {
  id: number;
  label: string;
}

interface Mesa {
  id: number;
  label: string;
}

const SLOTS_PER_DAY: Slot[] = [
  { id: 1, label: '12h-12h30' },
  { id: 2, label: '12h30-13h' },
  { id: 3, label: '13h-13h30' }
];

const TABLES: Mesa[] = [
  { id: 1, label: 'mesa 1' },
  { id: 2, label: 'mesa 2' },
  { id: 3, label: 'mesa 3' },
  { id: 4, label: 'mesa 4' },
  { id: 5, label: 'mesa 5' },
  { id: 6, label: 'mesa 6' }
];

@Component({
  selector: 'app-nova-reserva',
  templateUrl: './nova-reserva.html',
  styleUrls: ['./nova-reserva.css'],
  imports: [CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, FormsModule, MatNativeDateModule],
  standalone: true
})
export class NovaReservaComponent {
  today = new Date();
  selectedDay: Date | null = null;
  horariosDisponiveis: Slot[] = [...SLOTS_PER_DAY];
  mesasDisponiveis: Mesa[] = [...TABLES];
  mesaSelecionada: Mesa | null = null;
  horarioSelecionado: Slot | null = null;
  reserved: { idMesa: number; idHorario: number }[] = [];
  mensagem: string = '';

  constructor(private readonly reservasService: reservasService, private readonly cdr: ChangeDetectorRef) {}

  onDateChange() {
    if (this.selectedDay) {
      this.buscarReservas(this.selectedDay);
    }
  }

  buscarReservas(data: Date) {
    this.reservasService.buscarReservasPorDia(data).subscribe(data => {
      this.reserved = [...data];
    });
  }

  isHorarioDisponivel(horario: Slot): boolean {
    if (!this.reserved || !this.selectedDay) return true;
    return !this.reserved.some(r => r.idHorario === horario.id);
  }

  isMesaDisponivel(mesaId: number): boolean {
    if (!this.reserved || !this.selectedDay || !this.horarioSelecionado) return false;
    return !this.reserved.some(r => r.idMesa === mesaId && r.idHorario === this.horarioSelecionado?.id);
  }

  selecionarMesa(mesa: Mesa) {
    this.mesaSelecionada = mesa;
  }

  selecionarHorario(horario: Slot) {
    this.horarioSelecionado = horario;
    this.mesaSelecionada = null;
  }

  confirmarReserva() {
    if (!this.selectedDay || !this.mesaSelecionada || !this.horarioSelecionado) {
      this.mostrarMensagem('Por favor, preencha todos os campos.');
      return;
    }
    
    const reserva = {
      data: this.selectedDay.toISOString(),
      idMesa: this.mesaSelecionada.id,
      idHorario: this.horarioSelecionado.id
    };
    
    this.reservasService.enviarReserva(reserva).subscribe(
      (response: any) => {
        console.log(response)
        this.mostrarMensagem(response.message)
        this.limparFormulario();
      },(error: any)=>{
        this.mostrarMensagem(error.error.message)
        this.limparFormulario();
      }
    );
  }
  
  mostrarMensagem(texto: string) {
    this.mensagem = texto;
    console.log(this.mensagem)
    this.cdr.detectChanges()
    setTimeout(() => {
      this.mensagem = '';
    }, 5000);
  }

  limparFormulario() {
    this.selectedDay = null;
    this.mesaSelecionada = null;
    this.horarioSelecionado = null;
    this.reserved = [];
    this.cdr.detectChanges();
  }
}
