import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PokemonEffects } from './pokemon.effects';
import { PokemonService } from '../services/pokemon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('PokemonEffects', () => {
  let actions$: Observable<any>;
  let effects: PokemonEffects;
  let pokemonService: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PokemonEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        PokemonService,
      ],
    });

    effects = TestBed.inject(PokemonEffects);
    pokemonService = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
