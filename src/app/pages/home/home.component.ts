import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Captura o código da URL
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.exchangeCodeForToken(code);
    } else {
      console.error('Nenhum código foi encontrado na URL');
    }
  }

  async exchangeCodeForToken(code: string): Promise<void> {
    const tokenUrl = environment.cognito.tokenUrl;
    const clientId = environment.cognito.clientId;
    const redirectUri = environment.cognito.redirectUri;

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      code,
      redirect_uri: redirectUri
    });

    this.http
      .post(tokenUrl, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('id_token', response.id_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          this.router.navigate(['/dashboard']); // Redireciona para o dashboard
        },
        error: (err) => {
          console.error('Erro ao trocar o código por token:', err);
        }
      });
    
      try {
        const response: any = await this.http.post(tokenUrl, body.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).toPromise();

        // Verifica se a resposta contém os tokens
        if (response && response.access_token && response.id_token && response.refresh_token) {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('id_token', response.id_token);
          localStorage.setItem('refresh_token', response.refresh_token);

          this.router.navigate(['/dashboard']); // Redireciona para o dashboard
        } else {
          const errorMessage = 'Resposta do Cognito não contém os tokens esperados.';
          console.error(errorMessage);
          localStorage.setItem('last_error', errorMessage);
          // Tratar o erro, talvez redirecionando para uma página de erro ou exibindo uma mensagem
        }
    } catch (err) {
        console.error('Erro ao trocar o código por token:', err);
        const errorDetails = JSON.stringify(err);
        localStorage.setItem('last_error', errorDetails); // Salva detalhes do erro no localStorage
        // Tratar o erro, talvez redirecionando para uma página de erro ou exibindo uma mensagem
    }
    
  }
}
