const body = document.querySelector("body");
const gallery = document.querySelector(".gallery");
const search = document.querySelector(".search-container");

const employeeData = "https://randomuser.me/api/?results=12&nat=us";

// Used below to track the index of modal windows
let clickedProfile;

// FETCH Employee data
document.addEventListener("DOMContentLoaded", () => {
  fetch(employeeData)
    .then((response) => response.json())
    .then((data) => data.results)
    .then(generateUsersHTML)
    .then(addModalListeners)
    .catch((err) => {
      const h3 = document.createElement("h3");
      gallery.appendChild(h3);
      h3.insertAdjacentHTML("afterbegin", `<h3>${err}</h3>`);
    });
});

/**
 *
 * @param {*} data: parsed JSON data retrieved from Fetch request
 * map() dynmically inserts the desired props into the page
 */
const generateUsersHTML = (data) => {
  data.map((employee) => {
    const card = document.createElement("div");
    gallery.appendChild(card);
    card.className = "card";
    card.style.display = "block";
    card.insertAdjacentHTML(
      "beforeend",
      `
          <div class="card-img-container"> <img class="card-img" src=${employee.picture.thumbnail} alt="profile picture">
          </div>
          <div class="card-info-container"> <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="card-text" style="color:#00833f;">${employee.email}</p>
          <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
          </div>
        `
    );
  });
  return data;
};

/**
 *
 * @param {*} data : function uses data returned from generateUsersHTML() and supplies it to...
 *  (a) open modal window corresponding to user selection using data.find(),
 *  (b) supply generateModalHTML() with the SELECTED employee data,
 *  (d) update the global clickedProfile index, and
 *  (d) supply the newModal function with the employee data for it's own use
 */
function addModalListeners(data) {
  gallery.addEventListener("click", (e) => {
    const clicked = e.target;

    const cards = document.querySelectorAll(".card");
    const modalContainer = document.querySelector(".modal-container");

    if (clicked.className.includes("card")) {
      // Credit to Robert Manolis (FSJS Specialist) for sharing e.composedPath and [...] techniques below
      const path = e.composedPath();
      const card = [...cards].filter((c) => path.includes(c));

      data.find((employee) => {
        if (card[0].textContent.includes(employee.email)) {
          generateModalHTML(employee);
          clickedProfile = data.indexOf(employee);
          newModal(data);
        }
      });
    } else {
      e.preventDefault();
    }
  });
}

/**
 *
 * @param {*} employee : the single clicked selection, whether passed after page loads or passed from newModal function
 *  (newModal hanldes 'next' and 'prev' buttons)
 */
function generateModalHTML(employee) {
  const modal = document.createElement("div");
  gallery.appendChild(modal);

  // DOB formatting solution found on stack overflow https://stackoverflow.com/questions/28271904/javascript-reformat-date-string
  let DOBstamp = new Date(employee.dob.date);
  const birthday =
    DOBstamp.getMonth() +
    1 +
    "/" +
    DOBstamp.getDate() +
    "/" +
    DOBstamp.getFullYear();

  // Code adapted from Treehouse Regex Course (J. Kraft)
  function formatTelephone(text) {
    const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/;
    return text.replace(regex, "($1) $2-$3");
  }

  // Modal structure  and data insertion
  modal.className = "modal-container";
  modal.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${
              employee.picture.thumbnail
            }" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${
      employee.name.last
    }</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p clss="modal-text">${employee.location.street.number} ${
      employee.location.street.name
    }</p>
            <p class="modal-text">${employee.location.city}, ${
      employee.location.state
    } ${employee.location.postcode}</p>
            <p class="modal-text">${formatTelephone(employee.cell)}</p>
            <p class="modal-text">${birthday}</p>
        </div>
    </div>
    <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    `
  );

  // Close modal listener
  modal.addEventListener("click", (e) => {
    const clicked = e.target;
    if (clicked.id === "modal-close-btn" || clicked.textContent === "X") {
      modal.remove();
    }
  });
}

/**
 *
 * @param {*} employees : passed in from addModalListeners() (i.e. the full data array)
 */
function newModal(employees) {
  // JS EVENTS & CONDITIONALS FOR PROFILE MODAL
  body.addEventListener("click", (e) => {
    const clicked = e.target;

    // If the employee selected is the first of the list ...
    // ... and the user selects "previous"...
    if (clicked.id.includes("prev")) {
      if (clickedProfile === 0) {
        // ... display the employee at the end of the list ...
        clickedProfile = 11;
        generateModalHTML(employees[clickedProfile]);
        clickedProfile = clickedProfile - 1;
        // ... else, if the employ selected is not the first of the list ...
        // ... navigate to previous employee without changing any indecies.
      } else if (clickedProfile !== 0) {
        clickedProfile = clickedProfile - 1;
        generateModalHTML(employees[clickedProfile]);
      }
      document.querySelector(".modal-container").remove();
    }

    // If the employee selected is the last on the list ...
    // ... and the user selects "next" ...
    if (clicked.id.includes("next")) {
      if (clickedProfile === 11) {
        // ... display the employee at the begining of the list ...
        clickedProfile = 0;
        generateModalHTML(employees[clickedProfile]);
        clickedProfile += 1;
        // ... else, navigate to next employee without changing any indecies.
      } else if (clickedProfile !== 11) {
        clickedProfile += 1;
        generateModalHTML(employees[clickedProfile]);
      }
      document.querySelector(".modal-container").remove();
    }
  });
}

// SEARCH FEATURE
search.insertAdjacentHTML(
  "afterbegin",
  `
        <form action="#" method="get">                        
        <input type="search" id="search-input" 
        class="search-input" placeholder="Search..."><input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
`
);


function searchFeature() {
  // Store values of each employee name and translate to lowercase.
  const cards = document.querySelectorAll(".card");
  const cardNames = document.querySelectorAll(".card-info-container > h3");
  const searchText = document
    .querySelector("#search-input")
    .value.toLowerCase();

  // Matching names to be pushed into array. Cards will be filtered on the UI.
  let namesMatch = [];

  // Logic for filtering employee names.
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
    if (cardNames[i].textContent.toLowerCase().includes(searchText)) {
      cards[i].style.display = "block";
      namesMatch.push(cards[i]);
    }
  }
  if (namesMatch.length === 0) {
    const h3 = document.createElement("h3");
    gallery.appendChild(h3);
    h3.insertAdjacentHTML(
      "afterbegin",
      `<h3>Sorry! There are no names matching your search. Please try again.</h3>`
    );
  }
}

search.addEventListener("submit", searchFeature);
