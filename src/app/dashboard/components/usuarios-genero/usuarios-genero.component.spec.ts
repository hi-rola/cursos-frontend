import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosGeneroComponent } from './usuarios-genero.component';

describe('UsuariosGeneroComponent', () => {
  let component: UsuariosGeneroComponent;
  let fixture: ComponentFixture<UsuariosGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosGeneroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
