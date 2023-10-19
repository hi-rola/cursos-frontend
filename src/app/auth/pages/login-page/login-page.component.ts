import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  hide = true;
  ocultarMensaje = false;

  form: FormGroup = this.fb.group({
    correo: [
      'alfre@gmail.com',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
    contrasena: ['alfre123', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private authService: AuthService
  ) {}

  campoValido(field: string) {
    return this.validatorsService.isValidField(this.form, field);
  }

  getCampoError(field: string) {
    return this.validatorsService.getFieldError(this.form, field);
  }

  iniciarSesion() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { correo, contrasena } = this.form.value;

    this.authService.login(correo, contrasena).subscribe((response) => {
      switch (response) {
        case 'Sesión valida':
          break;
        case 'Correo y/o contraseña incorrectos':
          this.ocultarMensaje = true;
          break;
      }
    });
  }
}
