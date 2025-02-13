import { Component, computed, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../models/pokemon';
import { Observable } from 'rxjs';
import { PokemonActions } from '../../store/pokemon.actions';
import { selectSelectedPokemon } from '../../store/pokemon.selectors';
import { PokemonState } from '../../store/pokemon.reducer';
import {
  AsyncPipe,
  NgForOf,
  NgIf,
  NgOptimizedImage,
  NgStyle,
  UpperCasePipe,
} from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { getPokemonGradient } from '../../../utils/gradients';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    MatCard,
    NgIf,
    NgForOf,
    MatButton,
    NgStyle,
    MatDivider,
    UpperCasePipe,
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent implements OnInit {
  pokemon$: Observable<Pokemon | null> = this.store.select(selectSelectedPokemon);
  pokemonTypes = signal<{ type: { name: string } }[]>([]);
  gradient = computed(() => getPokemonGradient(this.pokemonTypes()));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ pokemon: PokemonState }>,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(PokemonActions.loadPokemon({ id: +id }));
    }
    this.pokemon$.subscribe((pokemon) => {
      if (pokemon) {
        this.pokemonTypes.set(pokemon.types || []);
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  protected readonly getPokemonGradient = getPokemonGradient;
}
