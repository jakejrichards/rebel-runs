import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerMenuPage } from './owner-menu.page';

describe('OwnerMenuPage', () => {
  let component: OwnerMenuPage;
  let fixture: ComponentFixture<OwnerMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
