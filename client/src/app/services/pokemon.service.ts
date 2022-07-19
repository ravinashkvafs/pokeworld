import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private apollo: Apollo) { }

  fetchPokemonList(page: number) {
    return this.apollo.query({
      query: gql`
        query {
          pokemon(page:${page}){
            id,
            name,
            image,
            types
          }
        }
      `
    }).pipe(map((resp) => resp?.data || {}));
  }

}
