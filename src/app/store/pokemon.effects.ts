import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PokemonService } from '../services/pokemon.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { PokemonActions } from './pokemon.actions';

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
  ) {}

  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      mergeMap(({ offset, limit }) =>
        this.pokemonService.getPokemons(offset, limit).pipe(
          map((pokemons) => PokemonActions.loadPokemonsSuccess({ pokemons })),
          catchError((error) => of(PokemonActions.loadPokemonsFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemon),
      mergeMap(({ id }) =>
        this.pokemonService.getPokemonById(id).pipe(
          map((pokemon) => PokemonActions.loadPokemonSuccess({ pokemon })),
          catchError((error) => of(PokemonActions.loadPokemonFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
