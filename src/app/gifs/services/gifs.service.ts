import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Gif, SearchResponse} from "../interfaces/gifs.interfaces";
//el providedIn root permite que el service este disponible en toda la aplicacion
// incluso otros modulos, si no lo ponemos deberiamos realizar el provider y exportarlo
@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifs: Gif[]=[];//esta lista es mas volatil

  private _tagHistory:string[]=[]; //esta no deberia cambiar hasta que yo lo indique
  private serviceUrl:string='https://api.giphy.com/v1/gifs';
  private api_key:string='ukNHMJyPfpN8ffwv2l7KEuDD0tWNrxl8';
  constructor(
    private http: HttpClient
  ) {
    this.loadLocalStorage();
  }

  get tagsHistory(){
    //return this._tagHistory; // de esta manera le pasas el [] por referencia
    return [...this._tagHistory];  //mejor pasar una copia,utilizando la operacion spread (devuelve los elementos del array, los copia al nuevo array)
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this.tagsHistory));
  }
  private loadLocalStorage():void{
    if (!localStorage.getItem('history')) return;
    this._tagHistory = JSON.parse(localStorage.getItem('history')!);
    if(this._tagHistory.length===0) return;
    this.searchTag(this._tagHistory[0]);
  }

  searchTag(tag:string):void{
    if (tag.length===0) return;
    this.organizeHistory(tag);
    // se puede utilizar de esta manera con Fetch y async await, pero mejor optar por utilizar el obj de angular
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=ukNHMJyPfpN8ffwv2l7KEuDD0tWNrxl8&q=valorant&limit=1')
    //   .then(resp => resp.json())
    //   .then(data=>console.log(data));
    const params = new HttpParams()
      .set('api_key',this.api_key)
      .set('limit', 10)
      .set('q', tag);

    //esto no es una promesa, sino es un Observable. Este emite valores,
    // cuando se 'suscriben' a los observables, estamos escuchando las emisiones que emite ese objeto
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe( (resp) =>{
        this.gifs= resp.data;
      })
  }
  private organizeHistory(tag:string){
    tag= tag.toLowerCase();
    if (this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter((oldTag)=>oldTag!==tag);
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0,10);
    this.saveLocalStorage();
  }
}
