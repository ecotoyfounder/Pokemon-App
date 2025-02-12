import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
import { PokemonActions } from '../../store/pokemon.actions';
import { selectPokemons, selectLoading, selectError } from '../../store/pokemon.selectors';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink, MatCard, NgIf, NgForOf, NgOptimizedImage, MatButton],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  pokemons$: Observable<Pokemon[]> = this.store.select(selectPokemons);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);

  currentPage = 0;
  limit = 20;

  constructor(private store: Store) {}

  ngOnInit() {
    this.loadPage();
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
