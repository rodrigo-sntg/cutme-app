import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly clientId = environment.cognito.clientId;
  private readonly cognitoDomain = environment.cognito.cognitoDomain;
  private readonly redirectUri = environment.cognito.redirectUri;
  private readonly scope = environment.cognito.scope;
  private readonly responseType = environment.cognito.responseType;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    const authUrl = `${this.cognitoDomain}/oauth2/authorize?response_type=${this.responseType}&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(this.scope)}`;
    window.location.href = authUrl; // Redireciona o usuário para o Hosted UI
  }

}
