import { Component, computed, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
import { PokemonActions } from '../../store/pokemon.actions';
import { selectPokemons, selectLoading, selectError } from '../../store/pokemon.selectors';
import {
  AsyncPipe,
  NgForOf,
  NgIf,
  NgOptimizedImage,
  NgStyle,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { getPokemonGradient } from '../../../utils/gradients';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    MatCard,
    NgIf,
    NgForOf,
    NgOptimizedImage,
    MatButton,
    NgStyle,
    UpperCasePipe,
    MatDivider,
    TitleCasePipe,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  pokemons$: Observable<Pokemon[]> = this.store.select(selectPokemons);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);

  currentPage = 0;
  limit = 18;

  pokemonList = signal<Pokemon[]>([]);
  pokemonGradients = computed(() =>
    this.pokemonList().map((pokemon) => {
      return pokemon.types
        ? getPokemonGradient(pokemon.types)
        : 'linear-gradient(to bottom right, #9e9e9e, #cfd8dc)';
    }),
  );

  constructor(private store: Store) {}

  ngOnInit() {
    this.loadPage();
    this.pokemons$.subscribe((pokemons) => {
      if (pokemons.length > 0) {
        this.pokemonList.set(pokemons);
      }
    });
  }

  loadPage() {
    const offset = this.currentPage * this.limit;
    this.store.dispatch(PokemonActions.loadPokemons({ offset, limit: this.limit }));
  }

  nextPage() {
    this.currentPage++;
    this.loadPage();
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPage();
    }
  }
}
