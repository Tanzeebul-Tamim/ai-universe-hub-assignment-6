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
        .map((feature) => `<li style="list-style: decimal;  margin-left: 1em;">${feature}</li>`)
        .join('');
  
      cardDiv.innerHTML = `
        <div class="border border-stone-200 rounded-2xl p-4">
          <img class="rounded-2xl" src="${card.image}" style="height: 300px;" alt="">
          <h1 class="text-2xl">Features</h1>
          <ol style="margin-left: 0;" id="feature-list">
            ${featuresListItems}
          </ol>
          <hr>
          <h1 class="text-2xl">${card.name}</h1>
          <h3><i class="fa-regular fa-calendar"></i> ${card.published_in}</h3>
        </div>
      `;
      cardsContainer.appendChild (cardDiv);
    });
  };
  

loadCards ();