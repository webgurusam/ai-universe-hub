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
          <button onclick='loadToolsData("${tool.id}")' class="text-error"><i class="fa-solid fa-arrow-right"></i></button>
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

// loading tools data
const loadToolsData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const toolsData = data.data;
    displayAiToolsContent(toolsData);
}

const displayAiToolsContent = (toolsData) => {
    console.log(toolsData);
    const aiToolsContentContainer = document.getElementById('ai-tools-content-container');
    aiToolsContentContainer.innerHTML = `
    <div class="border space-y-4 border-red-400 bg-[#fef7f7] rounded-xl px-6 py-8">
        <div>
            <p class="font-bold">${toolsData.description}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-white rounded-xl p-4 flex items-center text-green-600 font-bold">${toolsData?.pricing[0]?.price} ${toolsData?.pricing[0]?.plan}</div>
            <div class="bg-white rounded-xl p-4 flex items-center text-orange-600 font-bold">${toolsData?.pricing[1]?.price} ${toolsData?.pricing[1]?.plan}</div>
            <div class="bg-white rounded-xl p-4 flex items-center text-red-600 font-bold">${toolsData?.pricing[2]?.price} ${toolsData?.pricing[2]?.plan}</div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <h2 class="font-bold text-2xl mb-4">Features</h2>
                <ul class="list-disc text-gray-500 pl-6 space-y-1">
                <li>${toolsData.features['1'].feature_name}</li>
                <li>${toolsData.features['2'].feature_name}</li>
                <li>${toolsData.features['3'].feature_name}</li>
                </ul>
            </div>
            <div>
                <h2 class="font-bold text-2xl mb-4">Integrations</h2>
                <ul class="list-disc text-gray-500 pl-6 space-y-1">
                    <li>${toolsData?.integrations[0] || 'No data Found'}</li>
                    <li>${toolsData?.integrations[1] || 'No data Found'}</li>
                    <li>${toolsData?.integrations[2] || 'No data Found'}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="border border-gray-100 rounded-xl px-6 py-6">
        <div class='relative'>
            <img class="rounded-xl" src="${toolsData.image_link[0]}" alt="${toolsData.tool_name}">
            <div class="badge badge-error rounded-md text-white font-bold p-3 absolute top-2 right-2">${toolsData?.accuracy?.score.toString().slice(2,4)}% accuracy</div>
        </div>
        <div class="text-center mt-4">
        <h2 class="font-bold mb-3 text-lg">${toolsData?.input_output_examples[0]?.input}</h2>
        <p class=" text-gray-500 text-xs">${toolsData?.input_output_examples[0]?.output || 'No! Not Yet! Take a break!!!'}</p>
        </div>
    </div>
    `;
    my_modal_3.showModal()
}



loadAiToolsData(showSpinner(true));