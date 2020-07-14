import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { Pagination } from '../../utils/pagination.model';
import { formatDate } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  constructor(private characterService: CharacterService, private spinner: NgxSpinnerService) { }

  public characters = [];
  public pesquisa: string;
  public hasMoreCharacters: boolean;
  public isSearch: boolean;
  private page: number;

  ngOnInit() {
    this.pesquisa = '';
    this.hasMoreCharacters = true;
    this.isSearch = false;
    this.page = 0;
    this.getCharacters();
  }

  getCharacters() {
    const LIMIT = 9;
    const OFFSET = this.page * LIMIT;
    const pagination = new Pagination(LIMIT, OFFSET, this.pesquisa);

    this.spinner.show();
    this.characterService.getList(pagination).then(characters => {
      this.hasMoreCharacters = !!(characters.length === LIMIT);
      this.characters = this.characters.concat(characters);
      this.spinner.hide();
    });
  }

  getDataNascimento(character) {
    if (character.birthday === 'Unknown') {
      return 'Desconhecido';
    }

    return formatDate(character.birthday, 'dd/MM/yyyy', 'pt-BR');
  }

  buscarMaisPersonagens() {
    this.page++;
    this.getCharacters();
  }

  pesquisar() {
    this.page = 0;
    this.characters = [];
    this.isSearch = true;
    this.getCharacters();
  }

  hasCharacters() {
    return !!(this.characters.length);
  }
}
