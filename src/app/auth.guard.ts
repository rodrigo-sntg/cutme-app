import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service'; // Vamos criar esse serviço a seguir

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isTokenValid()) {
      return true; // Token válido, permite acesso à rota
    } else {
      this.authService.logout(); // Remove os tokens e redireciona para o login
      return this.router.parseUrl('/login'); // Retorna uma UrlTree para redirecionar
    }
  }
}