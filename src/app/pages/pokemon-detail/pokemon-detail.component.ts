import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../models/pokemon';
import { Observable } from 'rxjs';
import { PokemonActions } from '../../store/pokemon.actions';
import { selectSelectedPokemon } from '../../store/pokemon.selectors';
import { PokemonState } from '../../store/pokemon.reducer';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [AsyncPipe, NgOptimizedImage, MatCard, NgIf, NgForOf, MatButton],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent implements OnInit {
  pokemon$: Observable<Pokemon | null> = this.store.select(selectSelectedPokemon);
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
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
