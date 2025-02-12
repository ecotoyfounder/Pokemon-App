import { createActionGroup, props } from '@ngrx/store';
import { Pokemon } from '../models/pokemon';

export const PokemonActions = createActionGroup({
  source: 'Pokemon',
  events: {
    'Load Pokemons': props<{ offset: number; limit: number }>(),
    'Load Pokemons Success': props<{ pokemons: Pokemon[] }>(),
    'Load Pokemons Failure': props<{ error: string }>(),
    'Load Pokemon': props<{ id: number }>(),
    'Load Pokemon Success': props<{ pokemon: Pokemon }>(),
    'Load Pokemon Failure': props<{ error: string }>(),
  },
});
