import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UnifiedTableComponent} from './unified-table.component';

describe('UnifiedTableComponent', () => {
  let component: UnifiedTableComponent;
  let fixture: ComponentFixture<UnifiedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnifiedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnifiedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
