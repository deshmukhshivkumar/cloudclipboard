import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../services/auth-google.service';
import { ClipBoardService } from '../services/cboard.service';
import { CommonModule } from '@angular/common';
import { ClipBoardItem } from "../model/ClipBoardItem";

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
  ClipBoardItems: ClipBoardItem[] = [];
  profile: any;
  clipBoardData: any;

  ngOnInit(): void {
    this.showData();
  }

  showData() {
    let authServieResponse = this.authService.getProfile();
    console.log(authServieResponse);
    this.profile = authServieResponse;
    // if (this.profile === null) {
    //   alert("profile is null");
    //   this.router.navigate(['/login']);
    // }

    this.cboardService.getClipBoards()
    .subscribe((resp: { headers: any[]; body: any; }) => {
      console.log(resp);
      const keys = resp.headers.keys();
  
      for (const data of resp.body!) {
        this.ClipBoardItems.push(data);
      }
      console.log(this.clipBoardData);
    }); 
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
