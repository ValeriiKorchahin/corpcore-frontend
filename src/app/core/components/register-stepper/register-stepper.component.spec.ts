import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStepperComponent } from './register-stepper.component';
import { UserService } from '../../services/user.service';
import { CompanyService } from '../../services/company.service';
import { NotificationsService } from '../../services/notifications.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MockedObject, vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { signal } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { CompanyComponent } from './company/company.component';

describe('RegisterStepperComponent', () => {
  let component: RegisterStepperComponent;
  let fixture: ComponentFixture<RegisterStepperComponent>;
  let userService: MockedObject<UserService>;
  let companyService: MockedObject<CompanyService>;
  let notificationsService: MockedObject<NotificationsService>;
  let router: MockedObject<Router>;

  const mockRegisterForm = new FormGroup({
    name: new FormControl('John Doe'),
    email: new FormControl('john@example.com'),
    password: new FormControl('password123'),
    organizationName: new FormControl('Test Org'),
  });

  const mockCompanyForm = new FormGroup({
    name: new FormControl('Test Company'),
    email: new FormControl('company@example.com'),
    logoUrl: new FormControl('http://logo.url'),
    address: new FormControl('123 Test St'),
    phone: new FormControl('1234567890'),
    country: new FormControl('USA'),
  });

  beforeEach(async () => {

    userService = {
      register: vi.fn().mockReturnValue(of({ id: 1 })),
      getUserCompanies: vi.fn().mockReturnValue(of([]))
      } as MockedObject<UserService>;

    companyService = {
      create: vi.fn().mockReturnValue(of({ id: 1 })),
    } as MockedObject<CompanyService>;

    notificationsService = {
      showMessage: vi.fn(),
    } as MockedObject<NotificationsService>;

    router = {
      navigate: vi.fn(),
    } as MockedObject<Router>;

    await TestBed.configureTestingModule({
      imports: [RegisterStepperComponent],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
        {
          provide: CompanyService,
          useValue: companyService,
        },
        {
          provide: NotificationsService,
          useValue: notificationsService,
        },
        {
          provide: Router,
          useValue: router,
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterStepperComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.selectedIndex()).toBe(0);
    expect(component.steps().length).toBe(2);
    expect(component.steps()[0].submitted).toBe(false);
    expect(component.steps()[1].submitted).toBe(false);
  });

  it('should have correct step configuration', () => {
    const steps = component.steps();

    expect(steps[0]).toEqual({
      submitted: false,
      icon: 'person',
      name: 'Register',
    });

    expect(steps[1]).toEqual({
      submitted: false,
      icon: 'add_business',
      name: 'Create company',
    });
  });

  describe('selectTab', () => {
    it('should update selected index', () => {
      component.selectTab(1);
      expect(component.selectedIndex()).toBe(1);

      component.selectTab(0);
      expect(component.selectedIndex()).toBe(0);
    });
  });

  describe('nextStep', () => {
    it('should mark step as submitted and increment selected index', () => {
      const initialIndex = component.selectedIndex();

      component.nextStep(0);

      expect(component.steps()[0].submitted).toBe(true);
      expect(component.selectedIndex()).toBe(initialIndex + 1);
    });

    it('should not change submitted status if already submitted', () => {
      component.nextStep(0);
      expect(component.steps()[0].submitted).toBe(true);

      component.nextStep(0);
      expect(component.steps()[0].submitted).toBe(true);
    });

    it('should increment selected index correctly for different steps', () => {
      component.selectedIndex.set(0);
      component.nextStep(0);
      expect(component.selectedIndex()).toBe(1);

      component.nextStep(1);
      expect(component.selectedIndex()).toBe(2);
    });
  });

  describe('finishRegister', () => {
    beforeEach(() => {
      // Mock child components with forms
      const mockRegisterComponent = {
        form: mockRegisterForm,
      } as RegisterComponent;

      const mockCompanyComponent = {
        form: mockCompanyForm,
      } as CompanyComponent;

      // Override the viewChild signals
      Object.defineProperty(component, 'registerComponent', {
        value: signal(mockRegisterComponent),
        writable: true,
      });

      Object.defineProperty(component, 'companyComponent', {
        value: signal(mockCompanyComponent),
        writable: true,
      });
    });

    it('should register user and create company when skipCompany is false', () => {
      component.finishRegister(false);

      expect(userService.register).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        organizationName: 'Test Org',
      });

      expect(companyService.create).toHaveBeenCalledWith({
        name: 'Test Company',
        email: 'company@example.com',
        logoUrl: 'http://logo.url',
        address: '123 Test St',
        phone: '1234567890',
        country: 'USA',
      });

      expect(userService.getUserCompanies).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should register user without creating company when skipCompany is true', () => {
      component.finishRegister(true);

      expect(userService.register).toHaveBeenCalled();
      expect(companyService.create).not.toHaveBeenCalled();
      expect(userService.getUserCompanies).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should show error notification when register form is invalid', () => {
      const invalidForm = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        organizationName: new FormControl(''),
      });

      const mockRegisterComponent = {
        form: invalidForm,
      } as RegisterComponent;

      Object.defineProperty(component, 'registerComponent', {
        value: signal(mockRegisterComponent),
        writable: true,
      });

      component.finishRegister(false);

      expect(notificationsService.showMessage).toHaveBeenCalledWith(
        'Please, fill in the register form',
        'error'
      );
      expect(component.selectedIndex()).toBe(0);
    });

    it('should mark all fields as touched when form is invalid', () => {
      const invalidForm = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        organizationName: new FormControl(''),
      });

      const markAllAsTouchedSpy = vi.spyOn(invalidForm, 'markAllAsTouched');

      const mockRegisterComponent = {
        form: invalidForm,
      } as RegisterComponent;

      Object.defineProperty(component, 'registerComponent', {
        value: signal(mockRegisterComponent),
        writable: true,
      });

      component.finishRegister(false);

      expect(markAllAsTouchedSpy).toHaveBeenCalled();
    });

    it('should handle registration error gracefully', () => {
      userService.register.mockReturnValue(
        throwError(() => new Error('Registration failed'))
      );

      component.finishRegister(false);

      expect(userService.register).toHaveBeenCalled();
    });
  });

  describe('component integration', () => {
    it('should have registerComponent viewChild', () => {
      const registerComp = component.registerComponent();
      expect(registerComp).toBeDefined();
    });

    it('should have companyComponent viewChild', () => {
      const companyComp = component.companyComponent();
      expect(companyComp).toBeDefined();
    });
  });

  describe('full registration flow', () => {
    beforeEach(() => {
      const mockRegisterComponent = {
        form: mockRegisterForm,
      } as RegisterComponent;

      const mockCompanyComponent = {
        form: mockCompanyForm,
      } as CompanyComponent;

      Object.defineProperty(component, 'registerComponent', {
        value: signal(mockRegisterComponent),
        writable: true,
      });

      Object.defineProperty(component, 'companyComponent', {
        value: signal(mockCompanyComponent),
        writable: true,
      });
    });

    it('should complete full registration flow with company', async () => {
      component.finishRegister(false);

      await vi.waitFor(() => {
        expect(userService.register).toHaveBeenCalledTimes(1);
        expect(companyService.create).toHaveBeenCalledTimes(1);
        expect(userService.getUserCompanies).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    });

    it('should complete registration flow without company', async () => {
      component.finishRegister(true);

      await vi.waitFor(() => {
        expect(userService.register).toHaveBeenCalledTimes(1);
        expect(companyService.create).not.toHaveBeenCalled();
        expect(userService.getUserCompanies).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    });
  });
});
