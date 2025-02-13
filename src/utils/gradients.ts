import { PokemonType } from '../app/models/pokemon-type';

export const POKEMON_GRADIENTS: Record<PokemonType, string> = {
  [PokemonType.Normal]: 'linear-gradient(to bottom right, #abffe8, #00dcb8)',
  [PokemonType.Fairy]: 'linear-gradient(to bottom right, #ffa3d0, #ff49a7)',
  [PokemonType.Fighting]: 'linear-gradient(to bottom right, #eaeaea, #3a3a3a)',
  [PokemonType.Fire]: 'linear-gradient(to bottom right, #ff5722, #ff9800)',
  [PokemonType.Flying]: 'linear-gradient(to bottom right, #87ccf2, #454fda)',
  [PokemonType.Water]: 'linear-gradient(to bottom right, #2196f3, #64b5f6)',
  [PokemonType.Grass]: 'linear-gradient(to bottom right, #4caf50, #8bc34a)',
  [PokemonType.Ground]: 'linear-gradient(to bottom right, #e2bf65, #ad7621)',
  [PokemonType.Electric]: 'linear-gradient(to bottom right, #ffea00, #ff4e00)',
  [PokemonType.Poison]: 'linear-gradient(to bottom right, #f770de, #780084)',
};

export function getPokemonGradient(types: { type: { name: string } }[]): string {
  if (!types.length) return 'linear-gradient(to bottom right, #9e9e9e, #cfd8dc)';

  const selectedType = types.length > 1 ? types[1].type.name : types[0].type.name;
  return (
    POKEMON_GRADIENTS[selectedType as PokemonType] ||
    'linear-gradient(to bottom right, #9e9e9e, #cfd8dc)'
  );
}
