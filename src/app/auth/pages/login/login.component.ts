import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  public login() {
    // Go to backend
    // Get user

    this.authService.login().subscribe((resp) => {
      console.log(resp);

      if (resp.id) {
        this.router.navigate(['/heroes/list']);
      }
    });
  }

  public withoutLogin(): void {
    this.authService.logout();
    this.router.navigate(['./heroes']);
  }
}
