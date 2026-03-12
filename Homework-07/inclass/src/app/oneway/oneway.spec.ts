import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oneway } from './oneway';

describe('Oneway', () => {
  let component: Oneway;
  let fixture: ComponentFixture<Oneway>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Oneway]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Oneway);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
