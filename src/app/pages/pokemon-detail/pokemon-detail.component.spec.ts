import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { selectSelectedPokemon } from '../../store/pokemon.selectors';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;

  const mockActivatedRoute = {
    snapshot: { paramMap: { get: (key: string) => '1' } },
  };

  const mockPokemon = {
    id: 1,
    name: 'Bulbasaur',
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    types: [{ type: { name: 'grass' } }],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PokemonDetailComponent,
        RouterTestingModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideMockStore({ selectors: [{ selector: selectSelectedPokemon, value: mockPokemon }] }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display pokemon details', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Bulbasaur');
  });
});
