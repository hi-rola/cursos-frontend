import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeActualizarEstatusComponent } from './mensaje-actualizar-estatus.component';

describe('MensajeActualizarEstatusComponent', () => {
  let component: MensajeActualizarEstatusComponent;
  let fixture: ComponentFixture<MensajeActualizarEstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeActualizarEstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajeActualizarEstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
