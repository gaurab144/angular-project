import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreventAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
  private isAuthenticated(): boolean {
    // Check if the user is authenticated
    // Example: Check if a token exists in local storage
    const token = localStorage.getItem('token');
    return !!token;
  }
}
