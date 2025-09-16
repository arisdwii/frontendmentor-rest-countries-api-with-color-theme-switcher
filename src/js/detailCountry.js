const detailEl = document.getElementById("country-detail");

const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

async function getCountry() {
  try {
    const res = await fetch("data.json");
    const countries = await res.json();

    const country = countries.find(
      (c) => c.name.toLowerCase() === decodeURIComponent(countryName),
    );

    if (!country) {
      detailEl.innerHTML = "<p>Country not found</p>";
      return;
    }

    const borderNames = (country.borders || [])
      .map((code) => {
        const border = countries.find((c) => c.alpha3Code === code);
        return border ? border.name : null;
      })
      .filter(Boolean);

    detailEl.innerHTML = `
      <!-- Country Flag -->
      <figure class="overflow-hidden rounded-sm aspect-video">
        <img src="${country.flags.png}" alt="Flag of ${country.name}" draggable="false"
          class="object-cover w-full h-full">
        <figcaption class="sr-only">National flag of ${country.name}</figcaption>
      </figure>

      <!-- Country Details -->
      <section class="mt-8 lg:gap-5 sm:mt-0 lg:grid lg:grid-cols-2">
        <h2 class="text-xl font-extrabold lg:col-span-2">${country.name}</h2>

        <dl class="mt-5 leading-8 lg:mt-0">
          <div><dt class="inline font-semibold">Native Name:</dt> <dd class="inline">${country.nativeName || "-"}</dd></div>
          <div><dt class="inline font-semibold">Population:</dt> <dd class="inline">${country.population.toLocaleString("en-US")}</dd></div>
          <div><dt class="inline font-semibold">Region:</dt> <dd class="inline">${country.region || "-"}</dd></div>
          <div><dt class="inline font-semibold">Sub Region:</dt> <dd class="inline">${country.subregion || "-"}</dd></div>
          <div><dt class="inline font-semibold">Capital:</dt> <dd class="inline">${country.capital || "-"}</dd></div>
        </dl>

        <dl class="mt-8 leading-8 lg:mt-0">
          <div><dt class="inline font-semibold">Top Level Domain:</dt> <dd class="inline">${country.topLevelDomain?.join(", ") || "-"}</dd></div>
          <div><dt class="inline font-semibold">Currencies:</dt> <dd class="inline">${country.currencies?.map((c) => c.name).join(", ") || "-"}</dd></div>
          <div><dt class="inline font-semibold">Languages:</dt> <dd class="inline">${country.languages?.map((l) => l.name).join(", ") || "-"}</dd></div>
        </dl>

        <section class="mt-8 lg:col-span-2 lg:mt-0 lg:grid lg:grid-cols-[max-content_1fr] lg:gap-5 lg:items-start">
          <h3 class="text-lg font-semibold lg:text-base">Border Countries:</h3>
          <ul class="flex flex-wrap gap-5 mt-2 lg:mt-0">
            ${
              borderNames.length
                ? borderNames
                    .map(
                      (name) => `
                <li>
                  <a href="country.html?name=${encodeURIComponent(name.toLowerCase())}"
                    class="text-sm bg-[var(--color-element)] shadow-lg px-6 py-2 rounded-sm">
                    ${name}
                  </a>
                </li>`,
                    )
                    .join("")
                : "<li>No border countries</li>"
            }
          </ul>
        </section>
      </section>
    `;
  } catch (error) {
    console.log(error);
  }
}

getCountry();
