const countriesList = document.querySelector(".countries-list");
const filterBtns = document.querySelectorAll("[data-index]");
const searchInput = document.getElementById("search");

let allCountries = [];

async function getCountries() {
  try {
    const res = await fetch("data.json");
    allCountries = await res.json();

    renderListCountries(allCountries);
  } catch (error) {
    console.log(error);
  }
}

function renderListCountries(countries) {
  countriesList.innerHTML = countries
    .map(
      (c) => `
      <li>
        <a href="country.html?name=${encodeURIComponent(c.name.toLowerCase())}"
          class="block h-full bg-[var(--color-element)] shadow-sm rounded-sm overflow-hidden max-w-72 mx-auto group hover:bg-[var(--color-input)]/10 duration-200 md:mx-0">

          <div class="overflow-hidden aspect-video">
            <img src="${c.flags.png}" alt="Flag of ${c.name}" draggable="false"
              class="object-cover w-full h-full duration-200 group-hover:scale-125">
          </div>

          <div class="p-6 text-sm">
            <h3 class="mb-3 text-lg font-extrabold">${c.name}</h3>
            <p><span class="font-semibold">Population:</span> ${c.population.toLocaleString("en-US")}</p>
            <p><span class="font-semibold">Region:</span> ${c.region}</p>
            <p><span class="font-semibold">Capital:</span> ${c.capital}</p>
          </div>
        </a>
      </li>`,
    )
    .join("");
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const region = btn.dataset.index;

    filterBtns.forEach((b) => b.classList.remove("bg-[var(--color-input)]/10"));
    btn.classList.add("bg-[var(--color-input)]/10");

    const filtered =
      region === "all"
        ? allCountries
        : allCountries.filter((c) => c.region.toLowerCase() === region);

    renderListCountries(filtered);
  });
});

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allCountries.filter((c) =>
    c.name.toLowerCase().includes(query),
  );

  renderListCountries(filtered);
});

getCountries();
