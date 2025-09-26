const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");
const bucketListDiv = document.getElementById("bucketList");


const countryImages = {

  Algeria: ["images/algeria.jpg"],
  Angola: ["images/angola.jpg"],
  Benin: ["images/benin.jpg"],
  Botswana: ["images/botswana.jpg"],
  Burkina_Faso: ["images/burkina_faso.jpg"],
  Burundi: ["images/burundi.jpg"],
  Cape_Verde: ["images/cape_verde.jpg"],
  Cameroon: ["images/cameroon.jpg"],
  Central_African_Republic: ["images/central_african_republic.jpg"],
  Chad: ["images/chad.jpg"],
  Comoros: ["images/comoros.jpg"],
  Congo: ["images/congo.jpg"],
  DR_Congo: ["images/dr_congo.jpg"],
  Djibouti: ["images/djibouti.jpg"],
  Egypt: ["images/egypt.jpg"],
  Equatorial_Guinea: ["images/equatorial_guinea.jpg"],
  Eritrea: ["images/eritrea.jpg"],
  Eswatini: ["images/eswatini.jpg"],
  Ethiopia: ["images/ethiopia.jpg"],
  Gabon: ["images/gabon.jpg"],
  Gambia: ["images/gambia.jpg"],
  Ghana: ["images/ghana.jpg"],
  Guinea: ["images/guinea.jpg"],
  Guinea_Bissau: ["images/guinea_bissau.jpg"],
  Ivory_Coast: ["images/ivory_coast.jpg"],
  Kenya: ["images/kenya.jpg"],
  Lesotho: ["images/lesotho.jpg"],
  Liberia: ["images/liberia.jpg"],
  Libya: ["images/libya.jpg"],
  Madagascar: ["images/madagascar.jpg"],
  Malawi: ["images/malawi.jpg"],
  Mali: ["images/mali.jpg"],
  Mauritania: ["images/mauritania.jpg"],
  Mauritius: ["images/mauritius.jpg"],
  Morocco: ["images/morocco.jpg"],
  Mozambique: ["images/mozambique.jpg"],
  Namibia: ["images/namibia.jpg"],
  Niger: ["images/niger.jpg"],
  Nigeria: ["images/nigeria.jpg"],
  Rwanda: ["images/rwanda.jpg"],
  Sao_Tome_and_Principe: ["images/sao_tome_and_principe.jpg"],
  Senegal: ["images/senegal.jpg"],
  Seychelles: ["images/seychelles.jpg"],
  Sierra_Leone: ["images/sierra_leone.jpg"],
  Somalia: ["images/somalia.jpg"],
  South_Africa: ["images/south_africa.jpg"],
  South_Sudan: ["images/south_sudan.jpg"],
  Sudan: ["images/sudan.jpg"],
  Tanzania: ["images/tanzania.jpg"],
  Togo: ["images/togo.jpg"],
  Tunisia: ["images/tunisia.jpg"],
  Uganda: ["images/uganda.jpg"],
  Zambia: ["images/zambia.jpg"],
  Zimbabwe: ["images/zimbabwe.jpg"]
};



// Fetch African countries
async function fetchAfricanCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/region/africa");
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    resultsDiv.innerHTML = `<p>Failed to load countries. Try again later.</p>`;
    return [];
  }
}

// Display countries that match search
function displayCountries(countries, searchTerm = "") {
  resultsDiv.innerHTML = ""; 
  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filtered.length === 0) {
    resultsDiv.innerHTML = `<p>No countries found.</p>`;
    return;
  }

  filtered.forEach(country => {
    const card = document.createElement("div");
    card.classList.add("country-card");

    
    const localImage = countryImages[country.name.common]
      ? countryImages[country.name.common][0]
      : null;

    card.innerHTML = `
      <img src="${country.flags.png}" alt="${country.name.common} flag" width="170" >
      ${localImage ? `<img src="${localImage}" alt="${country.name.common} local" width="170">` : ""}
      <h3>${country.name.common}</h3>
      <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
      <p>Population: ${country.population.toLocaleString()}</p>
      <button class="add-btn">Add to Bucket List</button>
      
    `;

    
    card.querySelector(".add-btn").addEventListener("click", () => {
      addToBucketList(country);
    });

    resultsDiv.appendChild(card);
  });
}

// Add to bucket list
function addToBucketList(country) {
  const card = document.createElement("div");
  card.classList.add("country-card");

  // Check if we have a local image for this country
  const localImage = countryImages[country.name.common]
    ? countryImages[country.name.common][0]
    : null;

  card.innerHTML = `
    <img src="${country.flags.png}" alt="${country.name.common} flag" width="100">
    ${localImage ? `<img src="${localImage}" alt="${country.name.common} local" width="100">` : ""}
    <h3>${country.name.common}</h3>
  `;
  
  // Add delete button here
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = " Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    card.remove(); 
  });

  card.appendChild(deleteBtn);
  bucketListDiv.appendChild(card);
}



// Search functionality (button)
searchBtn.addEventListener("click", async () => {
  const countries = await fetchAfricanCountries();
  displayCountries(countries, searchInput.value);
});

searchInput.addEventListener("input", async () => {
  const countries = await fetchAfricanCountries();
  displayCountries(countries, searchInput.value);
});


  

    