import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHolidayDialogComponent } from './create-holiday-dialog.component';

describe('CreateHolidayDialogComponent', () => {
  let component: CreateHolidayDialogComponent;
  let fixture: ComponentFixture<CreateHolidayDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHolidayDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHolidayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
