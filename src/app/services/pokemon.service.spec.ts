import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemon';
import { PokemonType } from '../models/pokemon-type';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch pokemons with name, sprite, and type', () => {
    const dummyPokemons = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    };

    const dummyPokemon1 = { types: [{ type: { name: 'grass' } }] };
    const dummyPokemon2 = { types: [{ type: { name: 'poison' } }] };

    service.getPokemons(2, 0).subscribe((pokemons: Pokemon[]) => {
      expect(pokemons.length).toBe(2);
      expect(pokemons[0].name).toBe('bulbasaur');
      expect(pokemons[0].sprites.front_default).toBe(
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      );
      expect(pokemons[0].types[0].type.name).toBe('grass');

      expect(pokemons[1].name).toBe('ivysaur');
      expect(pokemons[1].types[0].type.name).toBe('poison');
    });

    const reqList = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=2&offset=0');
    expect(reqList.request.method).toBe('GET');
    reqList.flush(dummyPokemons);

    const reqType1 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(reqType1.request.method).toBe('GET');
    reqType1.flush(dummyPokemon1);

    const reqType2 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/2');
    expect(reqType2.request.method).toBe('GET');
    reqType2.flush(dummyPokemon2);
  });

  it('should fetch pokemon details by ID', () => {
    const dummyPokemon: Pokemon = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: 'https://pokeapi.co/media/sprites/bulbasaur.png' },
      width: '',
      height: '',
      types: [{ type: { name: 'grass' as PokemonType } }],
      abilities: [],
      stats: [],
    };

    service.getPokemonById(1).subscribe((pokemon) => {
      expect(pokemon).toEqual(dummyPokemon);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPokemon);
  });

  it('should handle errors gracefully', () => {
    service.getPokemons(1, 0).subscribe(
      () => fail('Should have failed'),
      (error) => expect(error).toBeTruthy(),
    );

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=1&offset=0');
    req.error(new ErrorEvent('Network error'));
  });
});
