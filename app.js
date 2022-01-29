const input = document.getElementById("input");
const searchBtn = document.getElementById("search");
const pokeBox = document.querySelector(".poke-box");
const pokeEmpty = document.querySelector(".poke-empty");
const api = "https://pokeapi.co/api/v2/pokemon/";

// rányomok a gombomra, és ha az input értéke üres, akkor a PokemonAll függvény fut le, ha pedig nem üres az inputom, akkor a PokemonSearch függvény fog lefutni

searchBtn.addEventListener("click", () => {

    if (input.value === "") {

        PokemonAll()
    } else {

        PokemonSearch()
    }

});

// ha üres a mezőm, és úgy kattintok a keresésre, akkor megjeleníti a result tömbön belüli elemeket (ebben az esetben ez 20 darab elem lesz)

async function PokemonAll() {

    const res = await fetch(api);
    const data = await res.json();

    // console.log(data);

    let output = "";

    data.results.forEach((pokemon) => {

        output += `
        <div class='poke-item'>
            <h4>${pokemon.name}</h4>
            <a href=${pokemon.url} alt='pokemon_link'>${pokemon.url}</a>
        </div>
        </div>`;
    });

    pokeEmpty.innerHTML = output;
    pokeBox.innerHTML = "";
}



// ha beírom a pokemon nevét a keresőbe, akkor megjelennek a beírt pokemonnal kapcsolatos adatok: a képe, a neve, a magassága és egy 3ds modell

async function PokemonSearch() {

    const res = await fetch(api + input.value);
    const data = await res.json();

    // console.log(data);

    let output = `
    <div class='pokemon'>
     <div class='pokemon-alap'>
     <img src=${data.sprites.front_default} alt=${data.name}/>
     <p class='pokemon-name'>${data.name}</p>
     <p>Magassága: ${data.height} méter</p>
     </div>

    <div class='pokemon-3d'>
     <p class='3d-model'>3D Modell:</p>
     <img src=${data.sprites.other.home.front_default} alt='home' />
    </div>
    </div>`;

    pokeBox.innerHTML = output;
    pokeEmpty.innerHTML = "";

}