import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { afterEach, expect } from 'vitest';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ApiService
      ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should make a GET request to the correct URL', () => {
      const mockResponse = { data: 'test' };
      const endpoint = '/test';

      service.get(endpoint).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(apiUrl + endpoint);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should pass options to the GET request', () => {
      const endpoint = '/test';
      const options = { params: { id: '123' } };

      service.get(endpoint, options).subscribe();

      const req = httpMock.expectOne(request =>
        request.url === apiUrl + endpoint &&
        request.params.get('id') === '123'
      );
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });

  describe('post', () => {
    it('should make a POST request with body', () => {
      const mockBody = { name: 'Test' };
      const mockResponse = { id: 1, name: 'Test' };
      const endpoint = '/users';

      service.post(endpoint, mockBody).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(apiUrl + endpoint);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockBody);
      req.flush(mockResponse);
    });

    it('should pass options to the POST request', () => {
      const mockBody = { name: 'Test' };
      const endpoint = '/users';
      const options = { headers: { 'X-Custom-Header': 'value' } };

      service.post(endpoint, mockBody, options).subscribe();

      const req = httpMock.expectOne(apiUrl + endpoint);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('X-Custom-Header')).toBe('value');
      req.flush({});
    });
  });

  describe('patch', () => {
    it('should make a PATCH request with body', () => {
      const mockBody = { name: 'Updated' };
      const mockResponse = { id: 1, name: 'Updated' };
      const endpoint = '/users/1';

      service.patch(endpoint, mockBody).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(apiUrl + endpoint);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(mockBody);
      req.flush(mockResponse);
    });

    it('should pass options to the PATCH request', () => {
      const mockBody = { name: 'Updated' };
      const endpoint = '/users/1';
      const options = { headers: { 'X-Custom-Header': 'value' } };

      service.patch(endpoint, mockBody, options).subscribe();
      const req = httpMock.expectOne(apiUrl + endpoint);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.headers.get('X-Custom-Header')).toBe('value');
      req.flush({});
    });
  });

  describe('put', () => {
    it('should make a PUT request with body', () => {
      const mockBody = { id: 1, name: 'Replaced' };
      const mockResponse = { id: 1, name: 'Replaced' };
      const endpoint = '/users/1';

      service.put(endpoint, mockBody).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(apiUrl + endpoint);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockBody);
      req.flush(mockResponse);
    });

    it('should pass options to the PUT request', () => {
      const mockBody = { id: 1, name: 'Replaced' };
      const endpoint = '/users/1';
      const options = { headers: { 'X-Custom-Header': 'value' } };

      service.put(endpoint, mockBody, options).subscribe();
      const req = httpMock.expectOne(apiUrl + endpoint);
      expect(req.request.method).toBe('PUT');
      expect(req.request.headers.get('X-Custom-Header')).toBe('value');
      req.flush({});
    });
  });

  describe('delete', () => {
    it('should make a DELETE request', () => {
      const mockResponse = { success: true };
      const endpoint = '/users/1';

      service.delete(endpoint).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(apiUrl + endpoint);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });

    it('should pass options to the DELETE request', () => {
      const endpoint = '/users/1';
      const options = { params: { force: 'true' } };

      service.delete(endpoint, options).subscribe();

      const req = httpMock.expectOne(request =>
        request.url === apiUrl + endpoint &&
        request.params.get('force') === 'true'
      );
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('error handling', () => {
    it('should handle HTTP errors', () => {
      const endpoint = '/test';
      const errorMessage = 'Not Found';

      service.get(endpoint).subscribe({
        next: () => {
          expect.fail('should have failed');
        },
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe(errorMessage);
        }
      });

      const req = httpMock.expectOne(apiUrl + endpoint);
      req.flush('Not Found', { status: 404, statusText: errorMessage });
    });
  });
});
