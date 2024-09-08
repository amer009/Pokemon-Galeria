import React, { useEffect } from 'react';
import '../welcome.css';  // Actualiza la ruta

function Welcome() {
    useEffect(() => {
        const pokemonContainer = document.getElementById('pokemon-container');
        let offset = 0;
        const limit = 20;

        const loadPokemons = () => {
            fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
                .then(response => response.json())
                .then(data => {
                    data.results.forEach(pokemon => {
                        fetch(pokemon.url)
                            .then(response => response.json())
                            .then(pokemonData => {
                                const card = document.createElement('div');
                                card.className = 'pokemon-card';

                                const img = document.createElement('img');
                                img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`;
                                img.alt = pokemonData.name;
                                card.appendChild(img);

                                const name = document.createElement('h3');
                                name.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
                                card.appendChild(name);

                                const stats = pokemonData.stats.map(stat => `<p><strong>${stat.stat.name}:</strong> ${stat.base_stat}</p>`).join('');
                                card.innerHTML += stats;

                                pokemonContainer.appendChild(card);
                            })
                            .catch(error => console.error('Error al obtener los datos del Pokémon:', error));
                    });
                    offset += limit;
                })
                .catch(error => console.error('Error al obtener la lista de Pokémon:', error));
        };

        loadPokemons();

        window.addEventListener('scroll', () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                loadPokemons();
            }
        });

        return () => {
            window.removeEventListener('scroll', loadPokemons);
        };
    }, []);

    return (
        <div>
            <header>
                <h1>Bienvenido a la Pokedex</h1>
                <nav>
                    <ul>
                        <li><a href="#pokemon">Pokémon</a></li>
                        <li><a href="#about">Acerca de</a></li>
                        <li><a href="#contact">Contacto</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <div id="pokemon-container" className="pokemon-container">
                </div>
            </main>
        </div>
    );
}

export default Welcome;
