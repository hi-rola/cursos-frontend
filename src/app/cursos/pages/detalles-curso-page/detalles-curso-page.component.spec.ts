import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCursoPageComponent } from './detalles-curso-page.component';

describe('DetallesCursoPageComponent', () => {
  let component: DetallesCursoPageComponent;
  let fixture: ComponentFixture<DetallesCursoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesCursoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesCursoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
