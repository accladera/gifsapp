import {Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {GifsService} from "../../services/gifs.service";

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text" class="form-control"
  placeholder="Buscar gifs"
  (keyup.enter)="searchTag()"
         #txtTagInput
  >
  `
})

export class SearchBoxComponent implements OnInit {
  @ViewChild("txtTagInput") //Referncia a un elemento, @ViewChildren sirve para lo mismo, pero para un conjunto de elemento []
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService:GifsService) {
  }

  ngOnInit() {
  }
  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
