import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl, FormControl } from '@angular/forms';
import { UsuarioService } from '../../Service/usuario/usuario.service';
import {Observable} from 'rxjs';
import { MatFormFieldControl} from '@angular/material/form-field';
import {MatDialog} from '@angular/material/dialog';

/** Data structure for Usuario. */
export class Usuario {
  constructor(
    public id: string,
    public tipoidentificacion: string,
    public nombre: string,
    public apellido: string,
    public email: string,
    public celular: string,
    public fechanacimiento: Date,
    public direccion: string,
    public departamento: string,
    public ciudad: string,
    public seudonimo: string,
    public clave: string
  ) {}
}

/**
 * Componente de actualizar datos del odontologo
 */
@Component({
  selector: 'app-actualizar-datos-odontologo',
  templateUrl: './actualizar-datos-odontologo.component.html',
  styleUrls: ['./actualizar-datos-odontologo.component.css']
})
export class ActualizarDatosOdontologoComponent implements OnInit {
  data: any = [];
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, public dialog: MatDialog) {
  }

  /**
   * Atributos utilizados
   */
  form: FormGroup | any;
  datapersona: any;
  mostrar: any = false;
  mensaje = '';
  hide = true;  public ident = 0;
  public tipoidentificacion = '';
  public nombre = '';
  public apellido = '';
  public email = '';
  public celular = '';
  public fechanacimiento = new Date();
  public direccion = '';
  public departamento = '';
  public ciudad = '';

  /**
   * Atributos requeridos por MatFormControl
   */
  readonly autofilled: boolean | undefined;
  readonly controlType: string | undefined;
  // @ts-ignore
  readonly disabled: boolean | undefined;
  // @ts-ignore
  readonly empty: boolean | undefined;
  // @ts-ignore
  readonly errorState: boolean | undefined;
  // @ts-ignore
  readonly focused: boolean | undefined;
  // @ts-ignore
  readonly id: string | undefined;
  // @ts-ignore
  readonly ngControl: NgControl | null | undefined;

  // @ts-ignore
  readonly placeholder: string | undefined;
  // @ts-ignore
  readonly required: boolean | undefined;

  // @ts-ignore
  readonly shouldLabelFloat: boolean | undefined;
  // @ts-ignore
  readonly stateChanges: Observable<void> | undefined;
  readonly userAriaDescribedBy: string | undefined;
  // @ts-ignore
  value: Usuario | null | undefined;

  /**
   * Metodo inicializador que hace funcionar los demas metodos que no dependen de un boton
   */
  ngOnInit(): void {
    this.builForm();
  }

  /**
   * Inicializa los formControlname
   */
  initEditForm(): void{
    this.form = this.fb.group({
      id: new FormControl(),
      tipoidentificacion: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      email: new FormControl(),
      celular: new FormControl(),
      fechanacimiento: new FormControl(),
      pais: new FormControl(),
      departamento: new FormControl(),
      ciudad: new FormControl(),
      seudonimo: new FormControl(),
      clave: new FormControl(),
    });
  }

  /**
   * Validar que cada campo sea requerido
   * @private
   */
  private builForm(): void{
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      tipoidentificacion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required]],
      fechanacimiento: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      seudonimo: ['', [Validators.required]],
      clave: ['', [Validators.required]],
    });
  }

  /**
   * Metodo para actualizar los datos del odontologo
   */
  actualizarUsuario(): void {
    this.usuarioService.getAllUsuario().subscribe((datauall: any) => {
      for (let i = 0 ; i < datauall.length ; i ++){
        if (this.form.value.id === datauall[i].cedula){
          this.datapersona = {
            cedula: this.form.value.id,
            nombre: this.form.value.nombre,
            apellido: this.form.value.apellido,
            seudonimo: this.form.value.seudonimo,
            tipo_identificacion: this.form.value.tipoidentificacion,
            correo: this.form.value.email,
            clave: this.form.value.clave,
            fecha_nacimiento: this.form.value.fechanacimiento,
            celular: this.form.value.celular,
            ciudad: this.form.value.ciudad,
            departamento: this.form.value.departamento,
            pais: this.form.value.pais
          };
        }
      }
      this.usuarioService.updateUsuario(this.datapersona, this.form.value.id).subscribe( (data: any) => {
        window.location.reload();
        this.dialog.open(DialogActualizarOdontologoComponent);
      });
    });
  }

  /**
   * Cargar los datos del odontologo en los campos
   */
  cargarData(): void {
    this.usuarioService.getAllUsuario().subscribe((data: any) => {
      let error = true;
      for (let i = 0 ; i < data.length ; i++){
        if (data[i].cedula === this.form.value.id){
          error = false;
        }
      }
      if (error === true){
        this.dialog.open(DialogErrorActualizarOdontologoComponent);
      } else  {
        this.usuarioService.getUsuario(this.form.value.id).subscribe( datas => {
          this.data = datas;
          this.form.patchValue({
            tipoidentificacion: this.data.tipo_identificacion,
            nombre: this.data.nombre,
            apellido: this.data.apellido,
            email: this.data.correo,
            celular: this.data.celular,
            // fechanacimiento: String(new Date(this.data.fechanacimiento).toISOString().replace(/T.*$/, '')),
            fechanacimiento: this.data.fecha_nacimiento,
            pais: this.data.pais,
            departamento: this.data.departamento,
            ciudad: this.data.ciudad,
            seudonimo: this.data.seudonimo,
            clave: this.data.clave,
          });
        });
      }
    });
  }

  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }
}

/**
 * Se llaman los dialogos para mostrar los mensajes correspondientes
 */
@Component({
  selector: 'app-dialog-actualizar-odontologo',
  templateUrl: 'dialog-actualizar-odontologo.html',
})
export class DialogActualizarOdontologoComponent {}

@Component({
  selector: 'app-dialog-error-actualizar-odontologo',
  templateUrl: 'dialog-error-actualizar-odontologo.html',
})
export class DialogErrorActualizarOdontologoComponent {}