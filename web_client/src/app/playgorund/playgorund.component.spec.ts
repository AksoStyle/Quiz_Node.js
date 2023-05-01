import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygorundComponent } from './playgorund.component';

describe('PlaygorundComponent', () => {
  let component: PlaygorundComponent;
  let fixture: ComponentFixture<PlaygorundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaygorundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaygorundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
