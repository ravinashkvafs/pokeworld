export interface PokemonI {
    id: number;
    name: string;
    image: string;
    types: PokemonTypeE[];
    cssStyle?: any;
}

export enum PokemonTypeE {
    bug,
    dark,
    dragon,
    electric,
    fairy,
    fighting,
    fire,
    flying,
    ghost,
    grass,
    ground,
    ice,
    normal,
    poison,
    psychic,
    rock,
    steel,
    water,
}

export const PokemonTypeToColorMap: any = {
    bug:
        '#d6ead8',
    dark:
        '#777777',
    dragon:
        '#fd753b',
    electric:
        '#f0eab4',
    fairy:
        '#f5e9dd',
    fighting:
        '#bcb5a2',
    fire:
        '#ea2300',
    flying:
        '#9eedf5',
    ghost:
        '#f8cefc',
    grass:
        '#5fc314',
    ground:
        '#c68767',
    ice:
        '#e4fdf8',
    normal:
        '#cdc2f9',
    poison:
        '#c377e0',
    psychic:
        '#eef7af',
    rock:
        '#684132',
    steel:
        '#a7a6b0',
    water:
        '#2384eb',
};