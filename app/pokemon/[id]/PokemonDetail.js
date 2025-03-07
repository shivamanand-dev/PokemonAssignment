'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const TYPE_COLORS = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300'
};

export default function PokemonDetail({ params }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${JSON.parse(params.value).id}`
        );
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [JSON.parse(params.value).id]);

  if (loading || !pokemon) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-96 animate-pulse bg-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Pokemon List
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  alt={pokemon.name}
                  className="w-full h-auto"
                />
              </div>

              <div className="w-full md:w-1/2">
                <h1 className="text-4xl font-bold capitalize mb-2">
                  {pokemon.name}
                </h1>
                <p className="text-xl text-gray-500 mb-4">
                  #{String(pokemon.id).padStart(3, '0')}
                </p>

                <div className="flex gap-2 mb-6">
                  {pokemon.types.map(({ type }) => (
                    <span
                      key={type.name}
                      className={`${TYPE_COLORS[type.name]} px-3 py-1 rounded-full text-white text-sm capitalize`}
                    >
                      {type.name}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Height</p>
                    <p className="text-lg font-semibold">
                      {pokemon.height / 10}m
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="text-lg font-semibold">
                      {pokemon.weight / 10}kg
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Abilities</h2>
                  <div className="flex gap-2">
                    {pokemon.abilities.map(({ ability }) => (
                      <span
                        key={ability.name}
                        className="px-3 py-1 rounded-full border border-gray-200 text-sm capitalize"
                      >
                        {ability.name.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex border-b border-gray-200">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'stats'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('stats')}
                >
                  Stats
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'moves'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('moves')}
                >
                  Moves
                </button>
              </div>

              <div className="mt-4">
                {activeTab === 'stats' ? (
                  <div className="space-y-4">
                    {pokemon.stats.map(({ base_stat, stat }) => (
                      <div key={stat.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium capitalize">
                            {stat.name.replace('-', ' ')}
                          </span>
                          <span className="text-sm text-gray-500">
                            {base_stat}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: `${(base_stat / 255) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {pokemon.moves.slice(0, 15).map(({ move }) => (
                      <span
                        key={move.name}
                        className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm capitalize"
                      >
                        {move.name.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
