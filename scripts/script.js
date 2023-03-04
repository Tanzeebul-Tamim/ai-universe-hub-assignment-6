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
}

const displayCardDetails = card => {
    const modalTitle = document.getElementById('cardDetailModalLabel');
    modalTitle.innerText = card.description;

    const pricing = document.getElementById('pricing');
    pricing.innerHTML = `
    <div class="bg-white font-bold px-6 py-3 rounded-xl flex flex-col justify-center" style="color: #03A30A;">
       <a onclick="removeCardDetails()" href="${card.website}">
           <h3>${card.pricing[0].price === '0' || card.pricing[0].price === 'No cost' ? "Free of Cost" : card.   pricing[0].price}</h3>
           <h3>${card.pricing[0].price === '0' || card.pricing[0].price === 'No cost' ? "" : card.pricing[0].plan}   </h3>
       </a>
    </div>
    <div class="bg-white font-bold px-6 py-3 rounded-xl flex flex-col justify-center" style="color: #F28927">
       <a onclick="removeCardDetails()" href="${card.website}">
           <h3>${card.pricing[1].price === '0' || card.pricing[1].price === 'No cost' ? "Free of Cost" : card.   pricing[1].price}</h3>
           <h3>${card.pricing[1].price === '0' || card.pricing[1].price === 'No cost' ? "" : card.pricing[1].plan}   </h3>
       </a>
    </div>
    <div class="bg-white font-bold px-6 py-3 rounded-xl flex flex-col justify-center" style="color: #EB5757">
       <a onclick="removeCardDetails()" href="${card.website}">
           <h3>${card.pricing[2].price}</h3>
           <h3>${card.pricing[2].plan}</h3>
       </a>
    </div>
    `;

    const featuresListItems = card.integrations
      .filter((feature) => feature)
      .map(
        (feature) =>
          `<li class="text-neutral-500" style="list-style: disc;  margin-left: 1em;">${feature}</li>`
      )
      .join("");
    
    const featuresIntegrations = document.getElementById('features-integrations');
    featuresIntegrations.innerHTML = `
    <div>
         <h1 class="text-xl font-bold mb-3">Features</h1>
         <ul class="text-neutral-500" style="list-style: disc; margin-left: 0;">
           <li style="margin-left: 1em;">${card.features['1']['feature_name']}</li>
           <li style="margin-left: 1em;">${card.features['2']['feature_name']}</li>
           <li style="margin-left: 1em;">${card.features['3']['feature_name']}</li>
         </ul>
     </div>
     <div>
         <h1 class="text-xl font-bold mb-3">Integrations</h1>
         <ul>
         ${featuresListItems}
         </ul>
     </div>
    `;

    const modalRightSide = document.getElementById('modal-right-side');
    modalRightSide.innerHTML = `
    <div class="relative">
       <img src="${card.image_link[0]}" class="rounded-xl" alt="" class="w-full h-auto">
       
       <h1 class="mt-3 mb-3 text-xl font-bold text-center">${card.input_output_examples[0].input}</h1>
       <h1 class="text-neutral-500">${card.input_output_examples[0].output}</h1>
    </div>
    `;
}

const removeCardDetails = () => {
    const remove = document.getElementById('remove');
    remove.innerHTML = `
    <div style="height: 600px;" class="modal-body d-flex justify-content-center align-items-center">
    <section id="loader">
    <div class="d-flex justify-content-center align-items-center ">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</section>
    </div>
    `;
}

loadCards(6);
