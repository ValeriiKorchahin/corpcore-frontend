import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationCompaniesComponent } from './organization-companies.component';

describe('OrganizationCompaniesComponent', () => {
  let component: OrganizationCompaniesComponent;
  let fixture: ComponentFixture<OrganizationCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationCompaniesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationCompaniesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
