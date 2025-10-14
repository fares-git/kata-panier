
import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CartCounter} from '../cart-counter/cart-counter';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  imports: [CartCounter, RouterLink, MatToolbar, MatIconButton, MatIcon],
  standalone: true
})
export class Navbar {
}
