import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Footer} from './shared/components/footer/footer';
import {Navbar} from './shared/components/app-header/navbar';
import {LoadingSpinner} from './shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar, LoadingSpinner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
