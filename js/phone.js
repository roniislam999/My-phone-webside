const loadPhone = async (searchText ='10',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json()
    const phones = data.data
    displayPhone(phones,isShowAll)
}

displayPhone = (phones,isShowAll) => {
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container')
    // ager phone gulo clear kore new phone dekhabe
    phoneContainer.textContent = '';

    // jodi 12 tar besi phones thake tahole show all buttone dekhabe and jodi 12 tar kom phones thake tahole show all buttone dekhabe nah btn ti hidden dekhabe,,,,
    const button = document.getElementById('Show-all')
    if (phones.length > 12 && !isShowAll) {
        button.classList.remove('hidden')
    }
    else {
        button.classList.add('hidden')
    }
    // console.log('is show all',isShowAll)
    // display only 12 phones phone is not show all;
    if(!isShowAll){
    phones = phones.slice(0, 12);
    }

    phones.forEach(phones => {
        // console.log(phones)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phones.image}" alt="Shoes" /></figure>
                    <div class="card-body text-center">
                      <h2 class="card-title justify-center">${phones.phone_name}</h2>
                      <p>${phones.slug}</p>
                      <div class="card-actions justify-center">
                        <button onclick ="handelShowDetails('${phones.slug}')" class="btn btn-primary">Details</button>
                      </div>
                    </div>
        `
        phoneContainer.appendChild(phoneCard)

    }),
    // spiner off
    toggleLoadingSpiner(false)
}

// handal show details 
const handelShowDetails = async (id)=>{
    // console.log('chekded show',id)
    // load single data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
    const phones = data.data;
    showPhnoeDetails(phones)

}
const showPhnoeDetails = (phones) =>{
    console.log(phones);
    // show the modal fuction call
    const phoneName = document.getElementById('phone-details-name');
      phoneName.innerText = phones.name;
      const showDetailsContainer = document.getElementById('show-details-container');
      showDetailsContainer.innerHTML = `
      <div class="p-4 space-y-6 mt-6 bg-gray-100 ">

      <div class="lg:pl-28 pl-0 mt-4">
      <img src= "${phones.image}" alt="" />
      </div>
      <p><span><span class="font-bold">Storage : </span></span>${phones?.mainFeatures?.storage}</p>
        <p><span><span class="font-bold">Display Size : </span></span>${phones?.mainFeatures?.displaySize}</p>
        <p><span><span class="font-bold">Chipset : </span></span>${phones?.mainFeatures?.chipSet}</p>
        <p><span><span class="font-bold">Memory : </span></span>${phones?.mainFeatures?.memory}</p>
        <p><span><span class="font-bold">Slug:  </span></span>${phones?.slug}</p>
        <p><span><span class="font-bold">releaseDate 
        : </span></span>${phones?.releaseDate}</p>
        <p><span><span class="font-bold">brand : </span></span>${phones?.brand}</p>
        <p><span><span class="font-bold">GPS : </span></span>${phones?.others?.GPS}</p>

      </div>
        
      `

    
    show_details_modal.showModal()
    
}

// hendal Search

const hendalSearch = (isShowAll) => {
    toggleLoadingSpiner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText,isShowAll)
}


// loding / spiner
const toggleLoadingSpiner = (isloading) =>{
    const LoadingSpiner = document.getElementById('loading-spinner')
    if(isloading){
        
    LoadingSpiner.classList.remove('hidden')
    }
    else{
        LoadingSpiner.classList.add('hidden')
    }
}

// show all
const showAll = () =>{
    hendalSearch(true);
} 

loadPhone()