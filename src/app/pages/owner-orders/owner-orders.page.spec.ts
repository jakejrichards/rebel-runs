import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerOrdersPage } from './owner-orders.page';

describe('OwnerOrdersPage', () => {
  let component: OwnerOrdersPage;
  let fixture: ComponentFixture<OwnerOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerOrdersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
