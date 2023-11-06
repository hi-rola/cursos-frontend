import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasCursosComponent } from './categorias-cursos.component';

describe('CategoriasCursosComponent', () => {
  let component: CategoriasCursosComponent;
  let fixture: ComponentFixture<CategoriasCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasCursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
