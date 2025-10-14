import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Navbar } from './navbar';
import { CartCounter } from '../cart-counter/cart-counter';
import { RouterTestingModule } from '@angular/router/testing';
import { signal } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Store} from '../../../core/store';

describe('Navbar Component', () => {
  let fixture: ComponentFixture<Navbar>;
  let component: Navbar;

  const storeMock = {
    $cartCount: signal(0),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        Navbar,
        CartCounter,
        RouterTestingModule,
        MatToolbar,
        MatIconButton,
        MatIcon,
      ],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
