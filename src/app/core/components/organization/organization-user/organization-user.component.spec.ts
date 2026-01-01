import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUserComponent } from './organization-user.component';

describe('OrganizationUserComponent', () => {
  let component: OrganizationUserComponent;
  let fixture: ComponentFixture<OrganizationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationUserComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
