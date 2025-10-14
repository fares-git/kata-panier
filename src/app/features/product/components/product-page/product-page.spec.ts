import {ComponentFixture, TestBed} from '@angular/core/testing';
import {signal, WritableSignal} from '@angular/core';
import {Store} from '../../../../core/store';
import {Category} from '../../../../shared/enums/category';
import {CategoryFilter} from '../../../../shared/components/category-filter/category-filter';
import '@angular/common/locales/global/fr';
import {FormsModule} from '@angular/forms';
import {MatDivider} from '@angular/material/divider';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';

describe('CategoryFilter Component', () => {
  let fixture: ComponentFixture<CategoryFilter>;
  let component: CategoryFilter;
  let storeMock: Partial<Store>;
  let categorySignal: WritableSignal<string>;

  beforeEach(() => {
    categorySignal = signal('');
    storeMock = {
      $categoryFilter: categorySignal,
    };

    TestBed.configureTestingModule({
      imports: [CategoryFilter, FormsModule, MatDivider, MatRadioGroup, MatRadioButton],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return selectedCategory from store', () => {
    expect(component.selectedCategory).toBe('');
    categorySignal.set('Food');
    expect(component.selectedCategory).toBe('Food');
  });


  it('should have all categories', () => {
    expect(component.categories.length).toBeGreaterThan(0);
    expect(component.categories).toContain(Category.Books);
  });
});






