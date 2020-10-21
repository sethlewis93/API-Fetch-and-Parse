
const search = document.querySelector('.search-container')
const gallery = document.querySelector('.gallery');
const headerText = document.querySelector('.header-text-container');

const employeeData = 'https://randomuser.me/api/?results=12&nat=us';

document.addEventListener('DOMContentLoaded', () => {
    fetch(employeeData)
        .then(response => response.json())
        .then(data => data.results)
        .then(generateUsersHTML)
        .then(addModalListeners)
        .catch(err => console.log(err));
});

const generateUsersHTML = (data) => {
    data.map(employee => {
        const card = document.createElement('div');
        gallery.appendChild(card);
        card.className = 'card';
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

const generateModalHTML = (employee) => {
    const modal = document.createElement('div');
    gallery.appendChild(modal);
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
            <p class="modal-text">${employee.location.street} ${employee.location.city} ,${employee.location.state} ${employee.location.postcode}</p>
            <p class="modal-text">${employee.dob.date}</p>
        </div>
    </div>
    `)
}

function addModalListeners(data) {
    gallery.addEventListener('click', (e) => {
        let clicked = e.target;
        data.find(employee => {
            if (clicked) {
                generateModalHTML(employee)
            }
        })
    });
}


// Search feature in progress
search
    .insertAdjacentHTML('afterbegin', `
        <form action="#" method="get">                        
        <input type="search" id="search-input" 
        class="search-input" placeholder="Search..."><input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
`);

/*
// Search filter function under construction
const searchFeature = (data) => {
    // get the data from the page
    data.filter(employee => {
        if (search.value.length !== 0) {
            let userSearch = search.value.toLowerCase();
            if (employee.first.includes(userSearch) || employee.last.includes(userSearch)) {
                return data
            }
        }
    });
};
*/

// Modal container under construction 
/*

gallery.insertAdjacentHTML('beforeend', `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="" alt="profile picture">
                    <h3 id="name" class="modal-name cap">nombre</h3>
                    <p class="modal-text">homestarrunner</p>
                    <p class="modal-text cap">city</p>
                    <hr>
                    <p class="modal-text">(555) 555-5555</p>
                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: 10/13/1993</p>
                </div>
            </div>

            <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
    </div>
`);

*/

