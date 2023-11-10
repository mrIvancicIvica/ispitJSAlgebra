const ulEl = document.querySelector('.ulEl');
const idInput = document.querySelector('.idInput');
const cardContent = document.querySelector('.cardContent');
const loadingText = document.querySelector('.loading');

const baseURL = 'https://itunes.apple.com/search';

const singerElements = [];

const createCard = (data) => {
  const cardElement = document.createElement('div');

  cardElement.innerHTML = `
                    <div class="ui card">
                    <div class="image">
                      <img src="${data.artworkUrl100}" />
                    </div>
                    <div class="content">
                      <a class="header nameCharacter">${data.artistName}</a>
                      <div class="meta">
                        <span class="date">${data.collectionExplicitness}</span>
                      </div>
                    </div>
                    <div class="extra content">
                      <h2>${data.trackPrice}$</h2>
                    </div>
                  </div>
      `;

  return cardElement;
};

const showLoadingText = () => {
  loadingText.style.display = 'block';
};

const hideLoadingText = () => {
  loadingText.style.display = 'none';
};

const updateUI = (data) => {
  console.log(data);

  for (const singer of data) {
    const liElelement = document.createElement('li');
    liElelement.innerText = singer.artistName;
    ulEl.appendChild(liElelement);
    singerElements.push(liElelement);

    const cardElement = createCard(singer);
    cardContent.appendChild(cardElement);
  }
};

idInput.addEventListener('input', async (e) => {
  const searchValue = e.target.value.trim();

  for (const cardElement of cardContent.children) {
    const characterName = cardElement
      .querySelector('.nameCharacter')
      .textContent.toLowerCase();

    cardElement.style.display = characterName.includes(searchValue)
      ? 'block'
      : 'none';
  }

  showLoadingText();
  

  const queryParams = new URLSearchParams({
    term: searchValue,
    entity: 'song',
  });

  try {
    const searchURL = `${baseURL}?${queryParams.toString()}`;

    const response = await fetch(searchURL);
    const data = await response.json();

    updateUI(data.results);
    hideLoadingText();
  } catch (error) {
    console.error(error);
  }
});
