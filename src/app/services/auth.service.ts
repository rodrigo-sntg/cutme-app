import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode'; // Importe a função jwtDecode diretamente

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly clientId = environment.cognito.clientId;
  private readonly cognitoDomain = environment.cognito.cognitoDomain;
  private readonly redirectUri = environment.cognito.redirectUri;
  private readonly scope = environment.cognito.scope;
  private readonly responseType = environment.cognito.responseType;

  constructor(private router: Router) { }

  // Verifica se o token está armazenado e se ainda é válido
  isTokenValid(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return false; // Sem token, inválido
    }

    const decodedToken: any = jwtDecode(token); // Use a função jwtDecode diretamente
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);

    return new Date() < expirationDate; // Verifica se a data atual é anterior à data de expiração
  }

  // Faz o logout do usuário
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('id_token');
    // Monta a URL de logout do Cognito
    this.router.navigate(['/login']);
  }

    // Inicia o processo de login
    login(): void {
      const authUrl = `${this.cognitoDomain}/oauth2/authorize?response_type=${this.responseType}&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(this.scope)}`;
      window.location.href = authUrl;
    }
}