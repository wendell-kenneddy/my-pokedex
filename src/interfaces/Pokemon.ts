export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface RawPokemon {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
}

export interface PokemonCardData {
  id: number;
  name: string;
  sprite: string;
  types: PokemonType[];
}
