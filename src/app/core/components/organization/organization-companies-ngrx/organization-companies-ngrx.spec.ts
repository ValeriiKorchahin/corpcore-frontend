import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationCompaniesNgrx } from './organization-companies-ngrx';

describe('OrganizationCompaniesNgrx', () => {
  let component: OrganizationCompaniesNgrx;
  let fixture: ComponentFixture<OrganizationCompaniesNgrx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationCompaniesNgrx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationCompaniesNgrx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
