import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { selectPokemons, selectLoading, selectError } from '../../store/pokemon.selectors';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  const mockPokemons = [
    {
      id: 1,
      name: 'Bulbasaur',
      sprites: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      },
      types: [{ type: { name: 'grass' } }],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PokemonListComponent,
        RouterTestingModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectPokemons, value: mockPokemons },
            { selector: selectLoading, value: false },
            { selector: selectError, value: null },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list of pokemons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.pokemon-card').length).toBe(1);
    expect(compiled.querySelector('.pokemon-card h3')?.textContent).toContain('Bulbasaur');
  });
});
