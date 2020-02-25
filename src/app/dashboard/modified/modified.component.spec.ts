import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedComponent } from './modified.component';

describe('ModifiedComponent', () => {
  let component: ModifiedComponent;
  let fixture: ComponentFixture<ModifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
