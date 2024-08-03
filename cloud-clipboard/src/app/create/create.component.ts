import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ClipBoardItem as cbItem } from '../model/ClipBoardItem';


@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'create.component.html',
    standalone: true,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
    ],
  })
  export class DialogOverviewExampleDialog {
    readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
    readonly data = inject<cbItem>(MAT_DIALOG_DATA);

    readonly clipBoardValue = model(this.data.value);
  

    onNoClick(): void {
      console.log(this.data);
      this.dialogRef.close();
    }
  }