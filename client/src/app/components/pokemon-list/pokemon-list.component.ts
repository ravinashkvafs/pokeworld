import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonI, PokemonTypeToColorMap } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  page: number = 0;
  list: PokemonI[] = [];

  constructor(private _pokemon: PokemonService) { }

  ngOnInit(): void {
    this.next();
  }

  next() {
    this.page++;

    this._pokemon.fetchPokemonList(this.page)?.pipe(map(e => (e as any)?.pokemon as PokemonI[]))
      .subscribe((list: PokemonI[]) => {
        list.forEach(p => this.getClassByPokemonType(p));
        this.list.push(...list);
      });
  }

  getClassByPokemonType(pokemon: PokemonI) {
    const len: number = pokemon?.types?.length;
    if (len > 1)
      pokemon.cssStyle = {

        'background-image': (Math.floor(Math.random() * 2)) % 2 == 0 ?
          `linear-gradient(135deg, ${pokemon?.types?.map(e => PokemonTypeToColorMap[e])?.join(',')})` :
          `radial-gradient(${pokemon?.types?.map(e => PokemonTypeToColorMap[e])?.join(',')})`
      };
    else
      pokemon.cssStyle = {
        'background-color': PokemonTypeToColorMap[pokemon?.types[0]] || '#ffffff'
      };

  }

}
