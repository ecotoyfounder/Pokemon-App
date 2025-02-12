import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/pokemon-list/pokemon-list.component').then((m) => m.PokemonListComponent),
  },
  {
    path: 'pokemon/:id',
    loadComponent: () =>
      import('./pages/pokemon-detail/pokemon-detail.component').then(
        (m) => m.PokemonDetailComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
