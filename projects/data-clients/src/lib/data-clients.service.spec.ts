import { TestBed } from '@angular/core/testing';

import { DataClientsService } from './data-clients.service';

describe('DataClientsService', () => {
  let service: DataClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
