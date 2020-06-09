import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StatisticTemplateComponent} from './statistic-template.component';

describe('StatisticTemplateComponent', () => {
  let component: StatisticTemplateComponent;
  let fixture: ComponentFixture<StatisticTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticTemplateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
