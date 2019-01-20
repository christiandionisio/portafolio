import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../intefaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {

    this.cargarProductos();

  }

  private cargarProductos(){

    return new Promise((resolve,reject) => {
      this.http.get('https://portafolio-899ca.firebaseio.com/productos_idx.json')
      .subscribe((resp:Producto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });

  }

  public getProducto(id: string) {
    return this.http.get(`https://portafolio-899ca.firebaseio.com/productos/${id}.json`);
  }

  public buscarProducto(termino:string) {

    if (this.productos.length === 0) {
        //cargar productos
        this.cargarProductos().then(() => {
          //ejecutar despues de tener los productos
          //aplicar filtro
          this.filtrarProductos(termino);
        })
    }else {
      //aplicar el filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino:string) {

    termino = termino.toLowerCase();
    this.productosFiltrado = [];
    this.productos.forEach(prod => {
      const tituloLower = prod.titulo.toLowerCase();
      if (prod.categoria.indexOf(termino) >= 0  || tituloLower.indexOf(termino) >= 0) {
          this.productosFiltrado.push(prod);
      }
    });
  }
}
