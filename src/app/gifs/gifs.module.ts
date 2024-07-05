import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home/home-page.component';
import {SearchBoxComponent} from "./components/search-box/search-box.component";
import {CardListComponent} from "./components/card-list/card-list.component";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    CardListComponent
  ],
  imports: [
    //mayormente los modulos van en los imports
    CommonModule,
    HttpClientModule
  ],
  providers: [
    // GifsService// en caso de no inyectar
  ],
  exports: [
    HomePageComponent,
    // GifsService //si otros modulos lo necesitan

  ],

})
export class GifsModule { }
