import {
  Component,
  OnInit,
  inject,
  model,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../services/auth-google.service';
import { ClipBoardService } from '../services/cboard.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ClipBoardItem } from '../model/ClipBoardItem';
import { DialogOverviewExampleDialog } from '../create/create.component';

const MODULES = [CommonModule];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MODULES,
    MatTableModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
  ],
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
  private dialog = inject(MatDialog);
  readonly clipboardItemSignal = signal('');
  readonly value = model('');

  ngOnInit(): void {
    this.showData();
  }

  showData() {
    let authServieResponse = this.authService.getProfile();
    console.log(authServieResponse);
    this.profile = authServieResponse;
    this.cboardService.getClipBoards().subscribe((serviceResponse: any[]) => {
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { value: this.value, clipboardItem: this.clipboardItemSignal() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.clipboardItemSignal.set(result);
      }
    });
  }
}
