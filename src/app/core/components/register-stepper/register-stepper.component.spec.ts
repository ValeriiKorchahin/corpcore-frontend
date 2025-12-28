import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStepperComponent } from './register-stepper.component';

describe('RegisterStepperComponent', () => {
  let component: RegisterStepperComponent;
  let fixture: ComponentFixture<RegisterStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterStepperComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
