import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Upload {
  id: string;
  filename: string;
  status: string;
  uniqueFileName: string;
  originalFileUrl: string;
  processedFileUrl: string;
  createdAt: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  uploads: Upload[] = [];
  newFile?: File;
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUploads();
    setInterval(() => this.fetchUploads(), 60000);
  }

  fetchUploads(): void {
    this.loading = true;
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    this.http.get<Upload[]>(`${environment.apiBaseUrl}/api/uploads`, { headers }).subscribe({
      next: (data) => {
        this.uploads = data.map(upload => ({
          ...upload,
          createdAt: new Date(Number(upload.createdAt) * 1000).toISOString() // Converte para milissegundos
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar uploads:', err);
        this.loading = false;
      }
    });
  }

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.newFile = target.files[0];
    }
  }

  async uploadFile(): Promise<void> {
    if (!this.newFile) {
      alert('Por favor, selecione um arquivo antes de fazer o upload.');
      return;
    }

    try {
      this.loading = true;
      const token = localStorage.getItem('access_token');
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + token,
      });

      const response = await this.http
        .post<{ signedUrl: string; uniqueId: string }>(
          `${environment.apiBaseUrl}/api/uploads/signed-url`,
          { fileName: this.newFile.name, fileType: this.newFile.type },
          { headers }
        )
        .toPromise();

      if (!response?.signedUrl) {
        throw new Error('Erro ao obter a URL assinada.');
      }

      await fetch(response.signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': this.newFile.type,
          'x-amz-meta-uniqueid': response.uniqueId,
          'x-amz-meta-userid': this.getUserIdFromToken(token),
        },
        body: this.newFile,
      });

      alert('Arquivo enviado com sucesso!');
      this.newFile = undefined;
      this.fetchUploads()
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao fazer upload. Tente novamente.');
    } finally {
      this.loading = false;
    }
  }

  private getUserIdFromToken(token: string | null): string {
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.username || '';
  }

  downloadFile(fileUrl: string, fileType: string): void {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    this.http
      .get(fileUrl, { headers, responseType: 'blob' })
      .subscribe({
        next: (blob) => {
          const link = document.createElement('a');
          const url = window.URL.createObjectURL(blob);
          link.href = url;
          link.download = `${fileType}_file`;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Erro ao baixar o arquivo:', err);
          alert('Erro ao baixar o arquivo. Tente novamente.');
        },
      });
  }
}