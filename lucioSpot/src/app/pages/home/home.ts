import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './modules/sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [SidebarComponent, CommonModule, RouterOutlet],
})
export class HomeComponent implements OnInit{
  constructor(private router: Router) {}
  menuItems = [
    { label: 'Nova reserva', route: '/reservar', isAdmin: false },
    { label: 'Minhas reservas', route: '/reservas', isAdmin: false  },
    { label: 'Sair', route: '/login', isAdmin: false }
  ];
  titulo = '';
  
  ngOnInit(): void {
    this.onMenuSelect('Nova reserva')
    if(localStorage.getItem('isAdmin') === 'Sim'){
      this.menuItems.splice(0,0,
        { label: 'Dashboard', route: '/dashboard', isAdmin: true})
        this.menuItems.splice(1,0,
          { label: 'Acessos', route: '/acessos', isAdmin: true}
        )
      }

  }

  getMenuLabels() {
    return this.menuItems.map(i => i.label);
  }

  onMenuSelect(label: string) {
    this.titulo = label
    const selected = this.menuItems.find(i => i.label === label);
    if (selected) {
      this.router.navigateByUrl(selected.route);
    }
  }

}
