import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModulesComponent } from './main-modules.component';

describe('MainModulesComponent', () => {
  let component: MainModulesComponent;
  let fixture: ComponentFixture<MainModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainModulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
