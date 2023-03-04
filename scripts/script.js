const loadCards = async (dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayCards(data.data.tools, dataLimit);
};

const displayCards = (cards, dataLimit) => {
  const cardsContainer = document.getElementById("cards-container");
  cards = cards.slice(0, dataLimit);

  //See more button-------------------------------------------------------------
  document.getElementById("see-more").addEventListener("click", function () {
    cardsContainer.textContent = "";
    loadCards();
    this.classList.add("d-none");
  });

  //Sort by date button-------------------------------------------------------------
  document
    .getElementById("sort-by-date-btn")
    .addEventListener("click", function () {
      cards.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
      cardsContainer.textContent = "";
      displayCards(cards, dataLimit);
    });

  cards.forEach((card) => {
    const cardDiv = document.createElement("div");

    // Create feature-list items
    const featuresListItems = card.features
      .filter((feature) => feature)
      .map(
        (feature) =>
          `<li class="text-lg text-neutral-500" style="list-style: decimal;  margin-left: 1em;">${feature}</li>`
      )
      .join("");

    cardDiv.innerHTML = `
        <div class="border border-stone-200 rounded-2xl p-4 h-100">
          <img class="rounded-2xl" src="${card.image}" style="height: 300px;" alt="">
          <h1 class="text-2xl font-bold mt-4 mb-2">Features</h1>
          <ol class="mb-3" style="margin-left: 0;" id="feature-list">
            ${featuresListItems}
          </ol>
          <hr>
        <div class="flex justify-between items-center">
           <div>
               <h1 class="text-2xl font-bold mt-2 mb-2">${card.name}</h1>
               <h3 class="text-lg text-neutral-500"><i style="margin-right: 5px;" class="fa-regular fa-calendar"></i> ${card.published_in}</h3>
           </div>
           <i onclick="loadCardDetails('${card.id}')" style="font-size: 25px;" class="fa-solid fa-arrow-right p-3 rounded-full text-rose-500 bg-red-50 hover:bg-red-100 hover:text-rose-600 cursor-pointer" data-bs-toggle="modal" data-bs-target="#cardDetailModal"></i>
        </div>
      `;
    cardsContainer.appendChild(cardDiv);
  });
};

const loadCardDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch (url);
    const data = await res.json ();
    displayCardDetails(data.data);
    console.log(data.data)
}

const displayCardDetails = card => {
    const modalTitle = document.getElementById('cardDetailModalLabel');
    modalTitle.innerText = card.description;

    const pricing = document.getElementById('pricing');
    pricing.innerHTML = `
    <div class="bg-purple-200 font-bold px-6 py-3 rounded-xl flex flex-col justify-center" style="color: #03A30A;">
        <h3>${card.pricing[0].price === '0' || card.pricing[0].price === 'No cost' ? "Free of Cost" : card.pricing[0].price}</h3>
        <h3>${card.pricing[0].price === '0' || card.pricing[0].price === 'No cost' ? "" : card.pricing[0].plan}</h3>
    </div>
    <div class="bg-purple-200 font-bold px-6 py-3 rounded-xl flex flex-col justify-center" style="color: #F28927">
        <h3>${card.pricing[1].price === '0' || card.pricing[1].price === 'No cost' ? "Free of Cost" : card.pricing[1].price}</h3>
        <h3>${card.pricing[1].price === '0' || card.pricing[1].price === 'No cost' ? "" : card.pricing[1].plan}</h3>
    </div>
    <div class="bg-purple-200 font-bold px-6 py-3 rounded-xl flex flex-col justify-center" style="color: #EB5757">
        <h3>${card.pricing[2].price}</h3>
        <h3>${card.pricing[2].plan}</h3>
    </div>
    `;
}

loadCards(6);
