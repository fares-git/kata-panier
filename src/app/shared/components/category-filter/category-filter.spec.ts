import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CategoryFilter} from './category-filter';
import {signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Store} from '../../../core/store';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatDivider} from '@angular/material/divider';

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

  it('should emit categorySelected on onCategorySelect', () => {
    const spy = jest.spyOn(component.categorySelected, 'emit');
    component.onCategorySelect('Books');
    expect(spy).toHaveBeenCalledWith('Books');
  });
});
