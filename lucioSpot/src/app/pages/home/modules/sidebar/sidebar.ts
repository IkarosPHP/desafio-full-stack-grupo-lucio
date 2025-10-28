import { Component, Input, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  standalone: true,
  imports: [CommonModule],
})
export class SidebarComponent implements OnInit {
  @Input() menuItems: any[] = [];
  @Output() select = new EventEmitter<string>();

  isMobile = false;
  menuOpen = true;

  constructor(private readonly authService: AuthService){}

  checkPermissao(item: any){
    if(item.isAdmin)
      return localStorage.getItem('isAdmin') === 'Sim'
    return true
  }

  ngOnInit() {
    this.updateMode(); 
  }
  @HostListener('window:resize')
  onResize() {
    this.updateMode();
  }

  updateMode() {
    this.isMobile = window.innerWidth <= 768;
    console.log(this.isMobile);
    this.menuOpen = !this.isMobile;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onSelect(item: string) {
    if(item === 'Sair')
      this.authService.logout()
    this.select.emit(item);
    if (this.isMobile) {
      this.menuOpen = false;
    }
  }
}
