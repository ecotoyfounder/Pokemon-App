import { PokemonType } from './pokemon-type';

export interface Pokemon {
  id: number;
  name: string;
  width: string;
  height: string;
  sprites: { front_default: string };
  types: { type: { name: PokemonType } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}
