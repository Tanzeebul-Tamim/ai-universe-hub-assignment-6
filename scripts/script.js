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
        .map((feature) => `<li style="list-style: decimal;">${feature}</li>`)
        .join('');
  
      cardDiv.innerHTML = `
        <div class="gap-5" style="border: 1px solid gray">
          <img src="${card.image}" style="height: 300px;" alt="">
          <h1 class="text-2xl">Features</h1>
          <ol id="feature-list">
            ${featuresListItems}
          </ol>
          <hr>
          <h1 id="card-title">${card.title}</h1>
          <h3>${card.subtitle}</h3>
        </div>
      `;
      cardsContainer.appendChild (cardDiv);
    });
  };
  

loadCards ();