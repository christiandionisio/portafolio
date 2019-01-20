import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../intefaces/info-pagina-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada: boolean = false;
  equipo: any[] = [];

  constructor(private http: HttpClient) {
    console.log("Servicio de info pagina listo");

    this.cargarInfo();
    this.cargarEquipo();

  }

  private cargarInfo() {
    //Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp:InfoPagina) => {
        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarEquipo() {
    this.http.get('https://portafolio-899ca.firebaseio.com/equipo.json')
      .subscribe( (data:any) => {
        this.cargada = true;
        this.equipo = data;
      } )
  }
}
