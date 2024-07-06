import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../services/auth-google.service';
import {ClipBoardService} from "../services/cboard.service";
import { CommonModule } from '@angular/common';

const MODULES = [CommonModule];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MODULES],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthGoogleService);
  private cboardService = inject(ClipBoardService);
  private router = inject(Router);
  profile: any;
  clipBoardData: any;
  
  ngOnInit(): void {
    this.showData();
  }

  showData() {
    this.profile = this.authService.getProfile();
    if(this.profile === null)
      this.router.navigate(['/login']);
    
    this.clipBoardData = this.cboardService.getClipBoards();
    console.log(this.profile);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
