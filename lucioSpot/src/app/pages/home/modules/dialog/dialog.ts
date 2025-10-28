import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { reservasService } from '../../../../services/reservas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
  styleUrl: 'dialog.css',
  imports: [MatDialogContent, MatDialogActions, CommonModule]
})
export class Dialog {
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
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reservasService: reservasService
  ) {}

  onConfirm() {
    this.reservasService.cancelarReserva(this.data.id).subscribe(() => {
      this.dialogRef.close(true); 
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
