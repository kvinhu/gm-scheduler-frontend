import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLineofServiceDialogComponent } from './create-lineofservice-dialog.component';

describe('CreateLineofserviceDialogComponent', () => {
  let component: CreateLineofServiceDialogComponent;
  let fixture: ComponentFixture<CreateLineofServiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLineofServiceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLineofServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
