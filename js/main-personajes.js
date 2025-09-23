const container = document.getElementById("personajes-container");

async function cargarPersonajes() {
  try {
    // Pedimos los primeros 12 Pokémon
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
    const data = await res.json();

    for (const personaje of data.results) {
      // Pedimos datos de cada Pokémon individual (incluye imagen)
      const resDetalle = await fetch(personaje.url);
      const detalle = await resDetalle.json();

      // Creamos tarjeta
      const card = document.createElement("div");
      card.className =
        "bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform";

      card.innerHTML = `
        <img src="${detalle.sprites.front_default}" alt="${detalle.name}" class="w-full h-48 object-contain bg-gray-100">
        <div class="p-6 text-center">
          <h3 class="text-xl font-semibold text-gray-800 capitalize">${detalle.name}</h3>
          <p class="mt-2 text-gray-600">ID: ${detalle.id}</p>
          <a href="personaje.html?id=${detalle.id}" 
             class="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Ver Detalle
          </a>
        </div>
      `;

      container.appendChild(card);
    }
  } catch (error) {
    container.innerHTML =
      "<p class='text-red-500'>Error al cargar personajes.</p>";
    console.error(error);
  }
}

cargarPersonajes();
