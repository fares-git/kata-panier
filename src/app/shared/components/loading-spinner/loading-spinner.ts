import {Component, computed, inject} from '@angular/core';
import {LoadingService} from '../../../core/services/loading';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.scss'
})
export class LoadingSpinner {
  loadingService: LoadingService=inject(LoadingService);
  readonly isLoading = computed(() => this.loadingService.isLoading());

}
