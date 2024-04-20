const loadAiToolsData = async (isSeeMore) => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const aiTools = data.data.tools;
    displayAiTools(aiTools, isSeeMore);
}
const displayAiTools = (aiTools, isSeeMore) => {
    const aiToolCardsContainer = document.getElementById('ai-tool-cards-container');
    const seeMoreFeaturesContainer = document.getElementById('see-more-features-container');
    // clear ai tool cards container
    aiToolCardsContainer.textContent = '';
    
    if(aiTools.length > 6 && !isSeeMore){
        seeMoreFeaturesContainer.classList.remove('hidden');
    }
    else{
        seeMoreFeaturesContainer.classList.add('hidden');
    }

    // load only 6 tools at a time
    if(!isSeeMore){
        aiTools = aiTools.slice(0,6);
    }

    aiTools.forEach(tool => {
        const cardsContentContainer = document.createElement('div');
        cardsContentContainer.classList = `flex flex-col justify-between p-5 bg-white border rounded-xl shadow-sm`;
        cardsContentContainer.innerHTML = `
        <div>
        <div>
            <img class="rounded-xl" src="${tool?.image}" alt="${tool.name}">
        </div>
        <div class="pb-6 mt-5 mb-6 border-b">
          <p class="mb-5 font-bold tracking-wide text-2xl">Features</p>
          <ul class="space-y-2">
          <li class="flex items-center">
              <div class="mr-2">
              <svg class="w-4 h-4 text-deep-purple-accent-400" viewBox="0 0 24 24" stroke-linecap="round" stroke-width="2">
                  <polyline fill="none" stroke="currentColor" points="6,12 10,16 18,8"></polyline>
                  <circle cx="12" cy="12" fill="none" r="11" stroke="currentColor"></circle>
              </svg>
              </div>
              <p class="font-medium text-gray-800">${tool.features[0]}</p>
          </li>
          <li class="flex items-center">
              <div class="mr-2">
              <svg class="w-4 h-4 text-deep-purple-accent-400" viewBox="0 0 24 24" stroke-linecap="round" stroke-width="2">
                  <polyline fill="none" stroke="currentColor" points="6,12 10,16 18,8"></polyline>
                  <circle cx="12" cy="12" fill="none" r="11" stroke="currentColor"></circle>
              </svg>
              </div>
              <p class="font-medium text-gray-800">${tool.features[1]}</p>
          </li>
          <li class="flex items-center">
              <div class="mr-2">
              <svg class="w-4 h-4 text-deep-purple-accent-400" viewBox="0 0 24 24" stroke-linecap="round" stroke-width="2">
                  <polyline fill="none" stroke="currentColor" points="6,12 10,16 18,8"></polyline>
                  <circle cx="12" cy="12" fill="none" r="11" stroke="currentColor"></circle>
              </svg>
              </div>
              <p class="font-medium text-gray-800">${tool.features[2]}</p>
          </li>
          </ul>
        </div>
        <div class="flex justify-between items-center">
          <div>
              <h3 class="font-bold text-2xl mb-2">${tool.name}</h3>
              <p class="text-gray-500"><i class="fa-regular fa-calendar"></i> <span class="text-sm">${tool.published_in}</span></p>
          </div>
          <button onclick='my_modal_3.showModal()' class="text-error"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
          
        `;
        aiToolCardsContainer.appendChild(cardsContentContainer);
    });
    showSpinner(false);
}

// see more ai tools
const seeMoreTools = () => {
    showSpinner(true)
    loadAiToolsData(true);
}

// showing spinner
const showSpinner = (isLoading) => {
    const getSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        getSpinner.classList.remove('hidden');
    }
    else{
        getSpinner.classList.add('hidden');
    }
}

loadAiToolsData(showSpinner(true));