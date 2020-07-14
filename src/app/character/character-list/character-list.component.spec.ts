import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterService } from '../character.service';
import { Type } from '@angular/core';
import { CharacterListComponent } from './character-list.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Character } from '../character';
import { environment } from '../../../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let httpMock: HttpTestingController;

  const character = {
    birthday: new Date("09-07-1958"),
    name: "Walter White",
    nickname: "Heisenberg"
  };

  const characters = [character];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
        FormsModule
      ],
      providers: [
        CharacterService
      ],
      declarations: [CharacterListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    // const req = httpMock.expectOne(`${environment.api.url}/characters?limit=9&offset=0&name=`);
    // req.flush(characters);

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // httpMock.verify();
  });

  it('deveria ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('test your http call', () => {
    expect(component.characters).toEqual(characters);
  });

  it(`deveria ter "pesquisa" com uma string vazia'`, async(() => {
    expect(component.pesquisa).toEqual('');
  }));

  it(`deveria ter "hasMoreCharacters" com "true"'`, async(() => {
    expect(component.hasMoreCharacters).toEqual(true);
  }));

  it(`deveria ter "isSearch" com "false"'`, async(() => {
    expect(component.isSearch).toEqual(false);
  }));
  
  describe('getDataNascimento()', () => {
    describe('caso a data de nascimento seja desconhecido', function(){
      it('deveria retornar "Desconhecido".',function(){
        expect(component.getDataNascimento({birthday: 'Unknown'})).toEqual('Desconhecido');
      });
    });

    describe('caso a data de nascimento NÃO seja desconhecido', function(){
      it('deveria retornar a data formatada.',function(){
        expect(component.getDataNascimento({birthday: '01-01-2011'})).toEqual('01/01/2011');
      });
    });
  });
});