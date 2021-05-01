import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.component.html',
  styleUrls: ['./registro-cita.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistroCitaComponent implements OnInit {

  form: FormGroup | any;
  constructor(private formBuilder: FormBuilder) {
    this.builForm();
  }
  ngOnInit(): void {
  }
  private builForm(){
    this.form = this.formBuilder.group({
      rut: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tipo_consulta: ['', [Validators.required]],
      odontologo: ['', [Validators.required]],
      fecha_cita: ['', [Validators.required]],
      hora: ['', [Validators.required]],
    });

    //this.form.valueChanges.pipe(debounceTime(500)).subscribe((value: any) => {
      //console.log(value);});
  }

  registrarCita(event: Event){
    event.preventDefault();
    if (this.form.valid){
      const value = this.form.value;
      console.log(value);
    } else {
      this.form.markAllAsTouched();
    }
  }

}