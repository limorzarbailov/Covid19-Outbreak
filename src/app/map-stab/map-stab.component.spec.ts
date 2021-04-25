import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapStabComponent } from './map-stab.component';

describe('MapStabComponent', () => {
  let component: MapStabComponent;
  let fixture: ComponentFixture<MapStabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapStabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapStabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
