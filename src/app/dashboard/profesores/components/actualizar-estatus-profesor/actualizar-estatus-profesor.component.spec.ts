import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarEstatusProfesorComponent } from './actualizar-estatus-profesor.component';

describe('ActualizarEstatusProfesorComponent', () => {
  let component: ActualizarEstatusProfesorComponent;
  let fixture: ComponentFixture<ActualizarEstatusProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarEstatusProfesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarEstatusProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
