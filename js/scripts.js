const body = document.querySelector('body');
const gallery = document.querySelector('.gallery');
const search = document.querySelector('.search-container')

const employeeData = 'https://randomuser.me/api/?results=12&nat=us';
// Used later to track the index of modal windows
let clickedProfile;

document.addEventListener('DOMContentLoaded', () => {
    fetch(employeeData)
        .then(response => response.json())
        .then(data => data.results)
        .then(generateUsersHTML)
        .then(addModalListeners)
        .catch(err => {
            const h3 = document.createElement('h3');
            gallery.appendChild(h3);
            h3.insertAdjacentHTML('afterbegin', `<h3>${err}</h3>`)
        });
});

/**
 * 
 * @param {*} data: parsed JSON data retrieved from Fetch request
 * the map method takes the data and dynmically inserts the desired props into the page
 */
const generateUsersHTML = (data) => {
    data.map(employee => {
        const card = document.createElement('div');
        gallery.appendChild(card);
        card.className = 'card';
        card.style.display = 'block';
        card.insertAdjacentHTML('beforeend', `
          <div class="card-img-container"> <img class="card-img" src=${employee.picture.thumbnail} alt="profile picture">
          </div>
          <div class="card-info-container"> <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="card-text" style="color:#00833f;">${employee.email}</p>
          <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
          </div>
        `);
    });
    return data;
};

/**
 * 
 * @param {*} data : function uses data returned from generateUsersHTML and supplies it to...
 *  (a) open modal window corresponding to user selection using data.find() method,
 *  (b) supply generateModalHTML with the SELECTED employee data,
 *  (d) update the global clickedProfile index, and 
 *  (d) supply the newModal function with the employee data for it's own use
 */
function addModalListeners(data) {
    gallery.addEventListener('click', (e) => {

        const clicked = e.target;

        const cards = document.querySelectorAll('.card');
        const modalContainer = document.querySelector('.modal-container');

        if (clicked.className.includes('card')) {
        
            // Credit to Robert Manolis (FSJS Specialist) for sharing e.composedPath and [...] techniques below
            const path = e.composedPath();
            const card = [...cards].filter(c => path.includes(c));  

            data.find(employee => {
                if(card[0].textContent.includes(employee.email)) {
                    generateModalHTML(employee);
                    clickedProfile = data.indexOf(employee);
                    newModal(data);
                }
            });
        } else {
            e.preventDefault();
        }

        if (clicked.id === 'modal-close-btn') {
            modalContainer.remove();
        }
    });
};

/**
 * 
 * @param {*} employee : the single clicked selection whether passed after page loads or passed from newModal function 
 *  (newModal hanldes 'next' and 'prev' buttons)
 */
const generateModalHTML = (employee) => {
    const modal = document.createElement('div');
    gallery.appendChild(modal);

    // DOB formatting solution found on stack overflow https://stackoverflow.com/questions/28271904/javascript-reformat-date-string
    let DOBstamp = new Date(employee.dob.date);
    const birthday = DOBstamp.getMonth( ) + 1 +'/'+ DOBstamp.getDate( ) + '/' +DOBstamp.getFullYear( );

    modal.className = 'modal-container';
    modal.insertAdjacentHTML('beforeend', `
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.thumbnail}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">${employee.cell}</p>
            <p class="modal-text">${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
            <p class="modal-text">${birthday}</p>
        </div>
    </div>
    <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    `)
}

/**
 * 
 * @param {*} employees : passed in from addModalListeners function (i.e. the full data array)
 */
function newModal(employees) {

    body.addEventListener('click', (e) => {
        const clicked = e.target;

        // Conditionals if user is at beginning of the list
        if(clicked.id.includes('prev')) {
            if(clickedProfile === 0) {
                clickedProfile = 11;
                generateModalHTML(employees[clickedProfile]);
                clickedProfile = clickedProfile - 1;
            }
            else if (clickedProfile !== 0) {
                clickedProfile = clickedProfile - 1;
                generateModalHTML(employees[clickedProfile]);
            }
            document.querySelector('.modal-container').remove();
        }

        // Conditionals if user is at end of the list
        if(clicked.id.includes('next')) {
            if(clickedProfile === 11) {
                clickedProfile = 0;
                generateModalHTML(employees[clickedProfile]);
                clickedProfile += 1;
            }
            else if (clickedProfile !== 11) {
                clickedProfile += 1;
                generateModalHTML(employees[clickedProfile]);
            }
            document.querySelector('.modal-container').remove();
        }
    })
};

// SEARCH 

search
    .insertAdjacentHTML('afterbegin', `
        <form action="#" method="get">                        
        <input type="search" id="search-input" 
        class="search-input" placeholder="Search..."><input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
`);

function searchFeature() {
    const cards = document.querySelectorAll('.card');

   for(let i =0; i < cards.length; i++) {
    cards[i].style.display = 'none';

    const searchfield = document.querySelector('#search-input');
    const userSearch = searchfield.value.toLowerCase(); 

    if(cards[i].textContent.includes(userSearch)) {
        cards[i].style.display = 'block';
    }

   }
};    

search.addEventListener('input', searchFeature);