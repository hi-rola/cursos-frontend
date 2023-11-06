import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarInformacionProfesorComponent } from './actualizar-informacion-profesor.component';

describe('ActualizarInformacionProfesorComponent', () => {
  let component: ActualizarInformacionProfesorComponent;
  let fixture: ComponentFixture<ActualizarInformacionProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarInformacionProfesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarInformacionProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
