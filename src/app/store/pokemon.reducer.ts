import { createReducer, on } from '@ngrx/store';
import { PokemonActions } from './pokemon.actions';
import { Pokemon } from '../models/pokemon';

export interface PokemonState {
  pokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
}

export const initialState: PokemonState = {
  pokemons: [],
  selectedPokemon: null,
  loading: false,
  error: null,
};

export const pokemonReducer = createReducer(
  initialState,
  on(PokemonActions.loadPokemons, (state) => ({ ...state, loading: true })),
  on(PokemonActions.loadPokemonsSuccess, (state, { pokemons }) => ({
    ...state,
    loading: false,
    pokemons,
  })),
  on(PokemonActions.loadPokemonsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(PokemonActions.loadPokemon, (state) => ({ ...state, loading: true })),
  on(PokemonActions.loadPokemonSuccess, (state, { pokemon }) => ({
    ...state,
    loading: false,
    selectedPokemon: pokemon,
  })),
  on(PokemonActions.loadPokemonFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
