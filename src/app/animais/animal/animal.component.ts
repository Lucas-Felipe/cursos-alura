import { environment } from './../../../environments/environment.prod';
import { Component, Input, OnInit } from '@angular/core';

const api = environment.apiURL;

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
})
export class AnimalComponent implements OnInit {
  private urloriginal = '';

  @Input() descricao = '';
  @Input() set url(url: string) {
    if (url.startsWith('data')) {
      this.urloriginal = url;
    } else {
      this.urloriginal = `${api}/imgs/${url}`;
    }
  }

  get url(): string {
    return this.urloriginal;
  }
  constructor() {}

  ngOnInit(): void {}
}
