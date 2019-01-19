import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../intefaces/info-pagina-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada: boolean = false;

  constructor(private http: HttpClient) {
    console.log("Servicio de info pagina listo");

    //Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp:InfoPagina) => {
        this.cargada = true;
        this.info = resp;
        console.log(resp);
      } );

  }
}