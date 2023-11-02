import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataClientsComponent } from './data-clients.component';

describe('DataClientsComponent', () => {
  let component: DataClientsComponent;
  let fixture: ComponentFixture<DataClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataClientsComponent]
    });
    fixture = TestBed.createComponent(DataClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
