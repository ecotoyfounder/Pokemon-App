import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { PokemonType } from '../models/pokemon-type';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(limit = 18, offset = 0): Observable<Pokemon[]> {
    return this.http
      .get<{
        results: { name: string; url: string }[];
      }>(`${this.apiUrl}?limit=${limit}&offset=${offset}`)
      .pipe(
        map((response) =>
          response.results.map((p, index) => ({
            id: offset + index + 1,
            name: p.name,
            sprites: {
              front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1}.png`,
            },
            width: '',
            height: '',
            types: [],
            abilities: [],
            stats: [],
          })),
        ),
        switchMap((pokemons) =>
          forkJoin(
            pokemons.map((pokemon) =>
              this.http
                .get<{ types: { type: { name: string } }[] }>(`${this.apiUrl}/${pokemon.id}`)
                .pipe(
                  map((data) => ({
                    ...pokemon,
                    types: data.types.map((t) => ({
                      type: { name: t.type.name as PokemonType },
                    })),
                  })),
                  catchError(() => of(pokemon)),
                ),
            ),
          ),
        ),
      );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }
}
