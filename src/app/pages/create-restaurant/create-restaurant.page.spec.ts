import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRestaurantPage } from './create-restaurant.page';

describe('CreateRestaurantPage', () => {
  let component: CreateRestaurantPage;
  let fixture: ComponentFixture<CreateRestaurantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRestaurantPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRestaurantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
