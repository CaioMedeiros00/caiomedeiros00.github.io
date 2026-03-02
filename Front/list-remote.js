// Fetch countries function
async function fetchCountriesData() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/region/europe");
        if (!response.ok) {
            console.log(`Network response was not ok - Status: ${response.status}`);
            return;
        }
        const data = await response.json();
        console.log(data);
        // Verify the code is working by logging the data to the console
        console.log(data);
        // Call the display function
        displayCountriesData(data);
    } catch (error) {
        const container = document.getElementById("remote-data-container");
        container.innerHTML = '<p class="error">⚠️ Failed to load data. Please try again later.</p>';   
        console.error(`Error fetching data: ${error}`);
    }
}

// Fetch users function
async function fetchUsersData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            console.log(`Network response was not ok - Status: ${response.status}`);
            return;
        }
        const data = await response.json();
        console.log(data);
        displayUsersData(data);
    } catch (error) {
        const container = document.getElementById("remote-data-container");
        container.innerHTML = '<p class="error">⚠️ Failed to load data. Please try again later.</p>';   
        console.error(`Error fetching data: ${error}`);
    }
}

// Store Rick & Morty data for search filtering
let rickMortyCharacters = [];

// Fetch Rick & Morty function
async function fetchRickMortyData() {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        if (!response.ok) {
            console.log(`Network response was not ok - Status: ${response.status}`);
            return;
        }
        const data = await response.json();
        console.log(data);
        rickMortyCharacters = data.results;
        displayRickMortyData(rickMortyCharacters);
        // Show search bar and reset input
        const searchContainer = document.getElementById("search-container");
        searchContainer.style.display = "block";
        document.getElementById("search-input").value = "";
    } catch (error) {
        const container = document.getElementById("remote-data-container");
        container.innerHTML = '<p class="error">⚠️ Failed to load data. Please try again later.</p>';   
        console.error(`Error fetching data: ${error}`);
    }
}

// Display countries function
function displayCountriesData(countriesArray) {
    const container = document.getElementById("remote-data-container");
    let htmlOutput = `<p style="grid-column: 1 / -1; text-align: center;"><b>Showing ${countriesArray.length} countries in Europe.</b></p>`;

    countriesArray.forEach(country => {
        htmlOutput += `
    <div style="border: 1px solid #ccc; padding: 12px; border-radius: 6px;"><img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="100">
         <p>
            <b>${country.name.common}</b><br>
            Capital: ${country.capital[0]}<br>
            Population: ${country.population.toLocaleString()}<br>            
            Region: ${country.region}
         </p>
    </div>
        `;
    });

    container.innerHTML = htmlOutput;
}

// Display users function
function displayUsersData(usersArray) {
    const container = document.getElementById("remote-data-container");
    let htmlOutput = "";

    usersArray.forEach(user => {
        htmlOutput += `
    <div style="border: 1px solid #ccc; padding: 12px; border-radius: 6px;">
       <p>
       <b>${user.name} ${user.username}</b><br>
        Email: <a href="mailto:${user.email}">${user.email}</a><br>
        Website: <a href="http://${user.website}" target="_blank">${user.website}</a><br>
        Location: ${user.address.street}, ${user.address.city}
       </p>
    </div>
        `;
    });
    container.innerHTML = htmlOutput;
}

// Display Rick & Morty function
function displayRickMortyData(rmArray) {
    const container = document.getElementById("remote-data-container");
    let htmlOutput = "";

    rmArray.forEach(character => {
        htmlOutput += `
    <div style="border: 1px solid #ccc; padding: 12px; border-radius: 6px;">
        <img src="${character.image}" alt="${character.name}" width="100">
        <p>
            <b>${character.name}</b><br>
            Status: ${character.status}
        </p>
    </div>
        `;
    });
    container.innerHTML = htmlOutput;
}

// Search input listener
document.getElementById("search-input").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const filtered = rickMortyCharacters.filter(c => c.name.toLowerCase().includes(query));
    displayRickMortyData(filtered);
});

// Event listener on the parent container
document.getElementById("button-container").addEventListener("click", function(e) {
    if (e.target.id === "btn-countries") {
        document.getElementById("search-container").style.display = "none";
        fetchCountriesData();
    } else if (e.target.id === "btn-users") {
        document.getElementById("search-container").style.display = "none";
        fetchUsersData();   
    } else if (e.target.id === "btn-rickmorty") {
        fetchRickMortyData();
    }
});
