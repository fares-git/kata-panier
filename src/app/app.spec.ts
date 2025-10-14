import { TestBed, ComponentFixture } from '@angular/core/testing';
import { App } from './app';
import { RouterTestingModule } from '@angular/router/testing';
import {CartCounter} from './shared/components/cart-counter/cart-counter';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Navbar} from './shared/components/app-header/navbar';
import {Footer} from './shared/components/footer/footer';

describe('App Component', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        App,
        Navbar,
        Footer,
        RouterTestingModule,
        CartCounter,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
