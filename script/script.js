const searchEl = document.getElementById('search-input');

// load api data
const loadPhone = async (searchId) => {
  const apiUrl =
    `https://openapi.programming-hero.com/api/phones?search=${searchId}`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  displayPhone(data.data);
};



// display phone
const displayPhone = (phones) => {
  const cardContainer = document.getElementById("products-container");
  // clear before  new display
  cardContainer.innerHTML = '';

  // display show all button if there are more than 12 phones 
  const showAllButton = document.getElementById('show-all-btn');
  if(phones.length > 12){
    showAllButton.classList.remove('hidden');
  }else{
    showAllButton.classList.add('hidden');
  }


  phones = phones.slice(0,6);


  phones.map((phone) => {
    const { phone_name, image } = phone;

    // created single card container div
    const cardDiv = document.createElement("div");
      cardDiv.classList = `border-2 border-blue-100 rounded-lg p-6 flex flex-col justify-between flex-1`;
      cardDiv.innerHTML = `
          <div class="bg-blue-50 py-12 px-24">
            <img src="${image}" alt="" class="w-full">
          </div>
          <div class="text-center mt-6 h-full flex flex-col justify-between">
            <h4 class="font-semibold text-base md:text-xl lg:text-2xl text-gray-700">${phone_name}</h4>
            <p class="mt-3">There are many variations of passages of available, but the majority have suffered</p>
            <p class="mt-2 font-bold text-base md:text-lg lg:text-xl text-gray-700">$ 999</p>
            <button
              class="text-white font-semibold py-2 md:py-2 px-6 w-full bg-blue-600 rounded-md cursor-pointer hover:bg-blue-500 mt-6"> show
            details</button>
          </div>
    `;
  cardContainer.appendChild(cardDiv);
  });
  toggleLoadingSpinner(false);
};


// handle search function
const handleSearch = () => {
  // to display loader
  toggleLoadingSpinner(true);
  const searchText = searchEl.value;
  loadPhone(searchText);

}


// to display and hide loading ...
const toggleLoadingSpinner = (isLoading) =>{
  const loaderEl = document.getElementById('loader');

  if(isLoading){
  loaderEl.classList.remove('hidden');
  }else{
  loaderEl.classList.add('hidden');

  }
}
