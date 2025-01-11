import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'cutme-app';

  constructor(private authService: AuthService) {}

  
  ngOnInit(): void {
    // Verifica a validade do token a cada 5 minutos (300000 milissegundos)
    setInterval(() => {
      if (!this.authService.isTokenValid()) {
        this.authService.logout();
      }
    }, 300000);
  }
}
