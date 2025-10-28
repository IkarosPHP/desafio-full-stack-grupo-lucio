import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../../services/usuariosService';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-acessos',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './acessos.html',
  styleUrl: './acessos.css',
})
export class Acessos implements OnInit{
  dataSource = new MatTableDataSource<any>([]);

  constructor(private usuariosService: UsuariosService, private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.usuariosService.listarUsuarios().subscribe(usuarios => {
      this.dataSource = new MatTableDataSource(usuarios);
      this.cdr.detectChanges()
    });

  }

  async toggleAdmin(usuario: any) {
    this.usuariosService.atualizarAdmin(usuario.uid, !usuario.isAdmin).subscribe();
    usuario.isAdmin = !usuario.isAdmin;
  }
}
