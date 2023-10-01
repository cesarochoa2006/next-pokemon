import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toogleFavoritePokemon(
  pokemonId: number,
  setFavorite?: Function
): void {
  const { userFavorites, isFavorite } = isFavoritePokemon(
    pokemonId,
    setFavorite
  );
  if (!isFavorite) {
    userFavorites.push(pokemonId);
    localStorage.setItem("favorites", JSON.stringify(userFavorites));
    if (setFavorite) setFavorite(true);
  } else {
    const newFavorites = userFavorites.filter(
      (fav: number) => fav !== pokemonId
    );
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    if (setFavorite) setFavorite(false);
  }
}

export function isFavoritePokemon(
  pokemonId: number,
  setFavoriteState?: Function
): any {
  if (!localStorage) return;

  const userFavorites = getFavorites();
  const isFavorite = userFavorites.find((fav: number) => fav === pokemonId);
  if (setFavoriteState) setFavoriteState(isFavorite);
  return { userFavorites, isFavorite };
}

export function getFavorites(): number[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

export async function getPokemonInfoBy(nameOrId: string) {
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);
  return {
    pokemon: {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    },
  };
}
