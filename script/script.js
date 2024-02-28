const searchEl = document.getElementById('search-input');

// load api data
const loadPhone = async (searchId, isShowAll) => {
  const apiUrl =
    `https://openapi.programming-hero.com/api/phones?search=${searchId}`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  displayPhone(data.data, isShowAll);
};



// display phone
const displayPhone = (phones, isShowAll) => {
  const cardContainer = document.getElementById("products-container");
  // clear before  new display
  cardContainer.innerHTML = '';

  // display show all button if there are more than 12 phones 
  const showAllButton = document.getElementById('show-all-btn');
  if(phones.length > 9 && !isShowAll){
    showAllButton.classList.remove('hidden');
    phones = phones.slice(0,9);
  }else{
    showAllButton.classList.add('hidden');
  }



  phones.map((phone) => {
    const { phone_name, image, slug } = phone;

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
            <button onclick="showDetails('${slug}'); my_modal.showModal()" 
              class="text-white font-semibold py-2 md:py-2 px-6 w-full bg-blue-600 rounded-md cursor-pointer hover:bg-blue-500 mt-6"> show
            details</button>
          </div>
    `;
  cardContainer.appendChild(cardDiv);
  });
  toggleLoadingSpinner(false);
};

// show details
const showDetails = async (id) => {
  // load single phone data
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data);

  // show modal
  handleModal(data.data);
}

// show Modal
const handleModal = (data) => {
  console.log(data);
  const {image, name, mainFeatures, slug, releaseDate, brand, others} = data;
  console.log(name,);

  const modalContainer = document.getElementById('my_modal');
  const newDiv = document.createElement('div');
  newDiv.classList.add('modal-box');
  newDiv.innerHTML = `

    <div class="bg-gray-200 flex justify-center py-4">
    <img src="${image}" alt="${name}">
    </div>
    <h3 class="font-bold text-xl mt-4">${name}</h3>
    <p class="py-4 text-justify text-sm mt-2">It is a long established fact that a reader will be distracted..</p>
      <h5><span class="font-bold">Storage : </span> ${mainFeatures.storage}</h5>
      <h5><span class="font-bold">Display Size : </span> ${mainFeatures.displaySize}</h5>
      <h5><span class="font-bold">Chipset : </span> ${mainFeatures.chipSet}</h5>
      <h5><span class="font-bold">Memory : </span> ${mainFeatures.memory}</h5>
      <h5><span class="font-bold">Slug : </span> ${slug}</h5>
      <h5><span class="font-bold">Release Data : </span> ${releaseDate}</h5>
      <h5><span class="font-bold">Brand : </span> ${brand}</h5>
      <h5><span class="font-bold">GPS : </span> ${others.GPS}</h5>

    <div class="modal-action">
      <form method="dialog">

        <button class="text-white font-semibold py-2 md:py-2 px-6 w-full bg-blue-600 rounded-md cursor-pointer hover:bg-blue-500">Close</button>
      </form>
    </div>
  `;
  modalContainer.appendChild(newDiv);


} 



// handle search function
const handleSearch = (isShowAll) => {
  // to display loader
  toggleLoadingSpinner(true);
  const searchText = searchEl.value;
  loadPhone(searchText, isShowAll);

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

// handle show all
const handleShowAll = () => {
  handleSearch(true);
}
