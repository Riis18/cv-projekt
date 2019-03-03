import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedInfoComponent } from './extended-info.component';

describe('ExtendedInfoComponent', () => {
  let component: ExtendedInfoComponent;
  let fixture: ComponentFixture<ExtendedInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
