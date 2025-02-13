import { pokemonReducer, initialState } from './pokemon.reducer';

describe('Pokemon Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = pokemonReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
