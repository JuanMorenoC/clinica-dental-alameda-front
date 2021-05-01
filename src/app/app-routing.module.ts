import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgendaComponent} from './agenda/agenda.component';
import {HomeComponent} from './home/home.component';
import {AppComponent} from './app.component';
import {RegistroHomeComponent} from './registro/registro-home/registro-home.component';
import {RegistroCitaComponent} from './registro/registro-cita/registro-cita.component';
import {RegistroAdministradorComponent} from './registro/registro-administrador/registro-administrador.component';
import {RegistroPacienteComponent} from './registro/registro-paciente/registro-paciente.component';

const routes: Routes = [
  {
    path: 'agenda',
    component: AgendaComponent, // another child route component that the router renders
  },
  {
    path: 'home',
    component: HomeComponent, // another child route component that the router renders
  },
  {
    path: 'registro/registro-home',
    component: RegistroHomeComponent, // another child route component that the router renders
  },
  {
    path: 'registro/registro-cita',
    component: RegistroCitaComponent, // another child route component that the router renders
  },
  {
    path: 'registro/registro-administrador',
    component: RegistroAdministradorComponent, // another child route component that the router renders
  },
  {
    path: 'registro/registro-paciente',
    component: RegistroPacienteComponent, // another child route component that the router renders
  },
  {
    path: '',
    component: AppComponent, // another child route component that the router renders
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }