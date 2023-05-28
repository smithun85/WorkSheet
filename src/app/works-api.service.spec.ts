import { TestBed } from '@angular/core/testing';

import { WorksApiService } from './works-api.service';

describe('WorksApiService', () => {
  let service: WorksApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorksApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
