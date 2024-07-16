import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../services/auth-google.service';
import { ClipBoardService } from '../services/cboard.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ClipBoardItem } from '../model/ClipBoardItem';

const MODULES = [CommonModule];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MODULES, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthGoogleService);
  private cboardService = inject(ClipBoardService);
  private router = inject(Router);
  clipBoardItems: ClipBoardItem[] = [];
  profile: any;
  clipBoardData: any;
  dataSource: any[] = [];
  displayedColumns: string[] = ['createdatetime', 'value'];

  ngOnInit(): void {
    this.showData();
  }

  showData() {
    let authServieResponse = this.authService.getProfile();
    console.log(authServieResponse);
    this.profile = authServieResponse;
    this.cboardService.getClipBoards().subscribe((serviceResponse: any[]) => {
      console.log('clipboard data');
      console.log(serviceResponse);
      for (const data of serviceResponse) {
        this.clipBoardItems.push(data);
      }
      this.dataSource = this.clipBoardItems;
      console.log(this.clipBoardItems);
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
