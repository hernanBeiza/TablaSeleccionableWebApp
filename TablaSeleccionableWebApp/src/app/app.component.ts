import { Component, OnInit } from '@angular/core';

import { SelectionType } from '@swimlane/ngx-datatable';

interface ItemTabla {
  nombre:string,
  era:number,
  mes:number,
  dia:number
}

interface ItemGrupoTabla {
  id:number,
  items:Array<ItemTabla>
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public SelectionType = SelectionType;

  public items:Array<ItemTabla> = new Array<ItemTabla>();
  public itemsSeleccionados:Array<ItemTabla> = new Array<ItemTabla>();

  public grupos:Array<ItemGrupoTabla> = new Array<ItemGrupoTabla>();

  public editing = {};

  public registrosPorPagina:number = 5;

	ngOnInit() {
    this.items.push({nombre:"Sentenciado 1",era:10,mes:2,dia:1});
    this.items.push({nombre:"Sentenciado 2",era:10,mes:2,dia:1});
    this.items.push({nombre:"Sentenciado 3",era:10,mes:2,dia:1});
    this.items.push({nombre:"Sentenciado 4",era:10,mes:2,dia:1});
    this.items.push({nombre:"Sentenciado 5",era:10,mes:2,dia:1});
	}

  public updateValue(event, cell, rowIndex):void {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.items[rowIndex][cell] = event.target.value;
    this.items = [...this.items];
    console.log('UPDATED!', this.items[rowIndex][cell]);
  }

  public onSelect(item:ItemTabla ):void {
    console.log(item);
  }

  public agregarAlGrupo():void {
    console.log(this.itemsSeleccionados);
    this.grupos.push({
      id:this.grupos.length,
      items:this.itemsSeleccionados
    });
    this.itemsSeleccionados = new Array<ItemTabla>();
  }

  public obtenerTotalDePaginas():number {
    return Math.round(this.items.length/this.registrosPorPagina);
  }

  public eliminar(sentencia:ItemGrupoTabla):void {
    this.grupos = this.grupos.filter(item=>item.id!=sentencia.id);
  }

}