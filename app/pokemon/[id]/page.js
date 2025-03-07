import PokemonDetail from './PokemonDetail';

export async function generateStaticParams() {
  // Fetch a list of Pokémon IDs from the API (pre-generating 10 Pokémon)
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
  const data = await response.json();

  return data.results.map((pokemon, index) => ({
    id: String(index + 1) // Convert to string because dynamic route uses string params
  }));
}

export default function PokemonDetails({ params }) {
  return (
    <div>
      <PokemonDetail params={params} />{' '}
    </div>
  );
}
