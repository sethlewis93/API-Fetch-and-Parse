
const search = document.querySelector('.search-container')
const gallery = document.querySelector('.gallery');
const headerText = document.querySelector('.header-text-container');

const studentData = 'https://randomuser.me/api/?results=12&nat=us';

document.addEventListener('DOMContentLoaded', () => {
    fetch(studentData)
        .then(response => response.json())
        .then(data => data.results)
        .then(generateHTML)
        .catch(err => console.log(err));
});

 const generateHTML = (data) => {
    data.map(student => {
        const card = document.createElement('div');
        gallery.appendChild(card);
        card.className = 'card';
        card.insertAdjacentHTML( 'beforeend',`
          <div class="card-img-container"> <img class="card-img" src=${student.picture.thumbnail} alt="profile picture">
          </div>
          <div class="card-info-container"> <h3 id="name" class="card-name cap">${student.name.first} ${student.name.last}</h3>
          <p class="card-text" style="color:#00833f;">${student.email}</p>
          <p class="card-text cap">${student.location.city}, ${student.location.state}</p>
          </div>
        `);
    });
};


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
    data.filter(student => {
        if (search.value.length !== 0) {
            let userSearch = search.value.toLowerCase();
            if (student.first.includes(userSearch) || student.last.includes(userSearch)) { 
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

