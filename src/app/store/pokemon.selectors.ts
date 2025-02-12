import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState } from './pokemon.reducer';

const selectPokemonState = createFeatureSelector<PokemonState>('pokemon');

export const selectPokemons = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.pokemons,
);

export const selectLoading = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.loading,
);

export const selectError = createSelector(selectPokemonState, (state: PokemonState) => state.error);

export const selectSelectedPokemon = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.selectedPokemon,
);
