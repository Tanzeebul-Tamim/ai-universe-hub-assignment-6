const loadCards = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch (url);
    const data = await res.json ();
    displayCards (data.data.tools);
}

const displayCards = cards => {
    const cardsContainer = document.getElementById('cards-container');
    cards.forEach (card => {
      const cardDiv = document.createElement ('div');
  
      // Create feature-list items
      const featuresListItems = card.features
        .filter((feature) => feature)
        .map((feature) => `<li class="text-lg text-neutral-500" style="list-style: decimal;  margin-left: 1em;">${feature}</li>`)
        .join('');
  
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
           <i id="btn-details" style="font-size: 25px;" class="fa-solid fa-arrow-right p-3 rounded-full text-rose-500 bg-red-50 hover:bg-red-100 hover:text-rose-600 cursor-pointer"></i>
        </div>
      `;
      cardsContainer.appendChild (cardDiv);
    });
  };
  

loadCards ();