import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, inject } from "@angular/core";
import {
    MatSnackBar,
} from '@angular/material/snack-bar';

export class AppErrorHandler implements ErrorHandler {

    snackBar = inject(MatSnackBar);

    private openSnackBar(error: Error) {
        this.snackBar.open(error.message, 'Close', {
            verticalPosition: "top",
            horizontalPosition: "center"
        });
    }

    handleError(error: Error) {
        // do something with the exception
        // TODO: Call telemetry api like NewRelic or something to capture the error metrics
        if (error instanceof HttpErrorResponse) {
            console.error('🔥 error ', JSON.stringify(error));
        } else {
            this.openSnackBar(error)
        }

    }
}