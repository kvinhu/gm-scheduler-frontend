import { TestBed } from '@angular/core/testing';

import { GetServicesService } from './get-services.service';

describe('GetServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetServicesService = TestBed.get(GetServicesService);
    expect(service).toBeTruthy();
  });
});
