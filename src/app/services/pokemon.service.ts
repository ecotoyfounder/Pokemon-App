import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(limit = 20, offset = 0): Observable<Pokemon[]> {
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
            types: [],
            abilities: [],
            stats: [],
          })),
        ),
      );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }
}
