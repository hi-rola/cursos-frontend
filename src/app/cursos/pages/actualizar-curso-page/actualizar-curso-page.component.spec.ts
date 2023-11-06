import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCursoPageComponent } from './actualizar-curso-page.component';

describe('ActualizarCursoPageComponent', () => {
  let component: ActualizarCursoPageComponent;
  let fixture: ComponentFixture<ActualizarCursoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarCursoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarCursoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
