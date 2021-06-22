import {
  Component,
  ChangeDetectionStrategy,
  OnInit, ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, NgControl
} from '@angular/forms';
import { MatFormFieldControl} from '@angular/material/form-field';
import { CitaService } from '../../Service/cita/cita.service';
import {RoleService} from '../../Service/role/role.service';
import {Observable} from 'rxjs';
import {UsuarioService} from '../../Service/usuario/usuario.service';
import {map, startWith} from 'rxjs/operators';

/** Data structure for cita. */
export class Procedimiento {
  constructor(
    public descripcion: string,
    public odontologo: string
  ) {}
}

@Component({
  selector: 'app-historial-paciente',
  templateUrl: './historial-paciente.component.html',
  styleUrls: ['./historial-paciente.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: HistorialPacienteComponent }]
})
export class HistorialPacienteComponent implements MatFormFieldControl<Procedimiento>, OnInit{
  data: any = [];
  public listaOdontologo: Array<any> = [];
  public listaUsuarios: Array<any> = [];
  public listaUsuariosPorOdontologo: Array<any> = [];
  public listaPaciente: Array<any> = [];
  public listaFecha: Array<any> = [];
  public listaDescripcion: Array<any> = [];
  public listaOdonto: Array<any> = [];
  public lista: Array<any> = [];
  public dataTabla: Array<any> = [];
  public dataH = new Object();
  public res: Array<any> = [];
  constructor(private fb: FormBuilder,
              private citaService: CitaService,
              private rolService: RoleService,
              private usuarioService: UsuarioService) {
    this.rolService.getAllRol().subscribe((datar: any) => {
      this.usuarioService.getAllUsuario().subscribe((datasO: any) => {
        console.log(datasO);
        for (let i = 0 ; i < datar.length ; i++){
          for (let j = 0; j < datasO.length ; j++) {
            if (datar[i].cedula === datasO[j].cedula && datar[i].nombre === 'odontologo'){
              this.listaOdontologo.push(datasO[j].nombre + ' ' + datasO[j].apellido);
            }
          }
        }
        // this.listaOdontologo.push('Ninguno');
      });
    });
  }

  form: FormGroup | any;
  public paciente = '';
  public odontologo = '';
  count = 0;
  public idet = 0;
  public tipoidentificacion = '';
  public nombre = '';
  public apellido = '';
  public email = '';
  public celular = '';
  public fechanacimiento = new Date();
  public direccion = '';
  public departamento = '';
  public ciudad = '';
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
  value: Cita | null | undefined;

  ngOnInit(): void{
    this.builForm();
  }
  log(): void {
    this.count++;
    console.log('Clicked!');
  }
  initEditForm(): void{
    this.form = this.fb.group({
      paciente: new FormControl(),
      odontologo: new FormControl(),
    });
  }
  private builForm(): void{
    this.form = this.fb.group({
      paciente: [''],
      odontologo: [''],
    });
  }
  cargarTabla(): void{
    let nombreCompleto = '';
    let nombrePaciente = '';
    this.citaService.getAllCita().subscribe((datap: any) => {
      for (let i = 0; i < datap.length ; i++) {
        nombrePaciente = datap[i].paciente.nombre + ' ' + datap[i].paciente.apellido;
        if (nombrePaciente === this.form.value.paciente){
          nombreCompleto = datap[i].odontologo.nombre + ' ' + datap[i].odontologo.apellido;
          this.dataH = [{
            date: String(new Date(datap[i].fecha_cita).toLocaleDateString()),
            describe: String(datap[i].descripcion),
            name: String(this.form.value.paciente),
            parent: String(nombreCompleto)
          }];
          // this.res = this.dataH;
          this.res.push(this.dataH);
        }
      }
      this.lista.push(this.dataTabla);
      console.log(this.res);
    });
  }
  cargarPacientes(): void{
    this.citaService.getAllCita().subscribe((data: any) => {
      let nombreOdonto = '';
      let nombrePaciente = '';
      for (let i = 0; i < data.length; i++) {
        nombreOdonto = data[i].odontologo.nombre + ' ' + data[i].odontologo.apellido;
        if (nombreOdonto === this.form.value.odontologo){
          if (data[i].estado === 'esta en el box'){
            nombrePaciente = data[i].paciente.nombre + ' ' + data[i].paciente.apellido;
            this.listaUsuariosPorOdontologo.push(nombrePaciente);
          }
        }
      }
    });
  }
  onContainerClick(event: MouseEvent): void {
  }
  setDescribedByIds(ids: string[]): void {
  }
}
