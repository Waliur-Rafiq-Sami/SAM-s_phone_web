const loadphone = async (searchText, isShowALL) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const PhoneInfo = await res.json();
  const phoneData = PhoneInfo.data;
  displayPhone(phoneData, isShowALL);
};

// Display Phone
const displayPhone = (phoneData, isShowALL) => {
  const showPhones = document.getElementById("Phone_container");
  showPhones.textContent = "";

  const showButton = document.getElementById("show_Button");
  const noTextAvailable = document.getElementById("no_text_available");
  if (phoneData.length < 1) {
    noTextAvailable.classList.remove("hidden");
    showButton.classList.add("hidden");
  } else if (phoneData.length > 9 && !isShowALL) {
    showButton.classList.remove("hidden");
    noTextAvailable.classList.add("hidden");
  } else {
    showButton.classList.add("hidden");
  }

  let phone = phoneData;
  if (!isShowALL) {
    phone = phoneData.slice(0, 9);
  } else {
    phone = phoneData;
  }

  phone.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList = `card md:w-full w-[95%] bg-base-100 border-2`;
    phoneDiv.innerHTML = `
    <figure class="px-10 pt-10">
          <img
            src="${phone.image}"
            alt="${phone.phone_name}"
            class="rounded-xl"
          />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>Please Press Show Details to know about more Information </br>
          <span class="text-red-400">Please Press</span>
          </p>
          <div class="card-actions">
            <button onclick="showDetails('${phone.slug}')" class="btn bg-[#8850bd] text-white text-xl">Show Details </button>
          </div>
        </div>
      `;
    showPhones.appendChild(phoneDiv);
  });
  scrollBarHandle(false);
};

// Search Input Fild
const searchFild = (isShowALL) => {
  scrollBarHandle(true);
  const searchFild = document.getElementById("Search_fild");
  const searchFildValue = searchFild.value;
  loadphone(searchFildValue, isShowALL);
};

// handle show all button
const scrollBarHandle = (isScroll) => {
  const scrollBar = document.getElementById("scroll_bar");
  if (isScroll) {
    scrollBar.classList.remove("hidden");
  } else {
    scrollBar.classList.add("hidden");
  }
};

// handle show all button
const showAllButton = () => {
  searchFild(true);
};

// ----------------------------------
// show details section Starts
const showDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showModal(phone);
};
// show_modal_phone_details.showModal();
const showModal = (phone) => {
  const modalcontainer = document.getElementById("show_modal_phone_details");
  modalcontainer.innerHTML = `
  <div class="modal-box">
           <div>
        <div class="flex justify-center items-center bg-gray-200 py-10 rounded-3xl">
          <img
            src="${phone?.image}"
            alt=""
          />
        </div>
        <div class="gap-2 flex flex-col">
          <h2 class="text-3xl mt-5">${phone.name}</h2>
          <p class="mb-5">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>
          <p><span class="font-semibold text-xl">Storage : </span> ${
            phone?.mainFeatures?.storage
          }</p>
          <p><span class="font-semibold text-xl">Display Size : </span> ${
            phone?.mainFeatures?.displaySize
          }</p>
          <p><span class="font-semibold text-xl"> Chipset : </span> ${
            phone?.mainFeatures?.chipSet
          }</p>
          <p><span class="font-semibold text-xl"> Memory : </span> ${
            phone?.mainFeatures?.memory
          }</p>
          <p><span class="font-semibold text-xl"> Slug : </span> ${
            phone?.slug
          }</p>
          <p>
            <span class="font-semibold text-xl"> Release date : </span> ${
              phone?.releaseDate
            }
          </p>
          <p>
            <span class="font-semibold text-xl">Brand : </span> ${phone?.brand}
          </p>
          <p>
            <span class="font-semibold text-xl">Gps :</span> ${
              phone?.others?.GPS || "No GPS Available"
            }
          </p>
        </div>
      </div>
          <div class="modal-action">
            <form method="dialog">            
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn btn-info text-white">Close</button>
            </form>
          </div>
        </div>  
  `;
  show_modal_phone_details.showModal();
};
// show details section end
loadphone("iphone", true);
